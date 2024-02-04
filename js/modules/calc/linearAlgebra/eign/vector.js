import Matrix from '../../class/Matrix.js'
import Vector from '../../class/Vector.js'

import minus from '../../minus.js'
import abs from '../../abs.js'
import add from '../../add.js'
import div from '../../div.js'
import toStepMatrix from '../toStepMatrix.js'

export default (mat, value)=>{
    const A=new Matrix(mat);
    for( let i=0; i<A.colSize; i++ ) A[i][i]=sub(mat[i][i], value);

    toStepMatrix(A);
    
    const vec=new Vector(mat.colSize);

    let search=A.colSize-1;
    while( search>=0 ){
	for( let i=mat.colSize-1; i>=0; i-- ){
	    if( abs(A[i][search])>1.0e-8 ){
		if( abs(A[i][search-1])<1.0e-8 ) vec[search]=0;
		else vec[search]=1.0;
		search--;
		break;
	    }
	}
	if( vec[search+1]!==0 ) break;
    }

    while( search>=0 ){
	for( let i=mat.colSize-1; i>=0; i-- ){
	    if( abs(A[i][search])>1.0e-8 ){
		let a=0;
		for( let k=A.colSize-1; k>search; k-- ) a=add(a, mul(vec[k], A[i][k]));
		vec[search]=div(minus(a), A[i][search]);
		search--;
		break;
	    }
	}
    }

    return vec;
};

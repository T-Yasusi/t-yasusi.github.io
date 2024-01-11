import Matrix from '../../class/Matrix.js'
import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'
import swapRow from '../swapRow.js'

import searchPivot from '../util/searchPivot.js'
import makeUnitMatrix from '../util/makeUnitMatrix.js'
import makePermutationMatrix from '../util/makePermutationMatrix.js'

export default (mat)=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.LU.leftLooking argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.LU.leftLooking Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);
    const LU=new Matrix(mat);
    let P=makeUnitMatrix(mat.colSize);

    for( let i=0; i<LU.colSize; i++ ){
	const pivot=searchPivot(mat, i);
        if( pivot!==i ){
            P=mul(P, makePermutationMatrix(mat.colSize, i, pivot));
            swapRow(LU, i, pivot);
	}
	
	for( let j=0; j<i; j++ ){
	    const a=LU[j][i];
	    for( let k=j+1; k<LU.colSize; k++ ){
		LU[k][i]=sub(LU[k][i], mul(a, LU[k][j]));
	    }
	}

	const a=div(1.0, LU[i][i]);
	for( let j=i+1; j<LU.colSize; j++ ){
	    LU[j][i]=mul(a, LU[j][i]);
	}
    }

    let L=new Matrix(LU);
    for( let i=0; i<LU.colSize; i++ ) L[i][i]=1;
    let U=new Matrix(LU);
    for( let i=0; i<LU.colSize; i++ ){
        for( let j=i+1; j<LU.colSize; j++ ){
            L[i][j]=0;
            U[j][i]=0;
	}
    }
    L=mul(P, L);

    return [ L, U, P ];    
}

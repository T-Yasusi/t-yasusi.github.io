import Matrix from '../class/Matrix.js'
import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import abs from '../abs.js'

const thre=1.0e-8;

export default (mat)=>{
    const E=mul(mat.trans(), mat);
    for( let i=0; i<E.colSize; i++ ){
	for( let j=0; j<E.rowSize; j++ ){
	    if( i===j ){
		if( abs(sub(E[i][j], 1))>thre ) return false;
	    }
	    else{
		if( abs(E[i][j])>thre ) return false;
	    }
        }
    }
    return true;
}

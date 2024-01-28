import Matrix from '../class/Matrix.js'
import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import abs from '../abs.js'
import swapRow from './swapRow.js'

import searchPivot from './util/searchPivot.js'

import det from './det.js'

export default mat=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.reverseBySweep argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.reverseBySweep Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);

    if( det(mat)===0 ) throw new Error('!!! linearAlgebra.reverseBySweep det(mat)=0, so reverse matrix is not exsist !!!');
    
    const copied=new Matrix(mat);
    const result=new Matrix(mat.colSize, mat.rowSize);
    for( let i=0; i<mat.colSize; i++ ) result[i][i]=1;
    
    for( let i=0; i<mat.colSize; i++ ){
	const pivot=searchPivot(mat, i);
	if( pivot!==i ){
	    swapRow(copied, i, pivot);
	    swapRow(result, i, pivot);
	}

	const a=copied[i][i];
	for( let k=0; k<mat.colSize; k++ ){
	    copied[i][k]=div(copied[i][k], a);
	    result[i][k]=div(result[i][k], a);
	}
	
	for( let j=i+1; j<mat.colSize; j++ ){
            const coff=div(copied[j][i], copied[i][i]);
            for( let k=0; k<mat.colSize; k++ ){
		copied[j][k]=sub(copied[j][k], mul(coff, copied[i][k]));
		result[j][k]=sub(result[j][k], mul(coff, result[i][k]));
	    }
        }
    }
    
    for( let i=mat.colSize-1; i>=0; i-- ){
	for( let j=0; j<i; j++ ){
	    const coff=copied[j][i]
	    for( let k=0; k<mat.colSize; k++ ){
		result[j][k]=sub(result[j][k], mul(coff, result[i][k]));
		copied[j][k]=sub(copied[j][k], mul(coff, copied[i][k]));
	    }
	}
    }
        
    return result;
}
    

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
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.LU.crout argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.LU.crout Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);
    const LU=new Matrix(mat);
    let P=makeUnitMatrix(mat.colSize);

    for( let i=0; i<LU.colSize; i++ ){
	const pivot=searchPivot(LU, i);
        if( pivot!==i ){
            P=mul(P, makePermutationMatrix(mat.colSize, i, pivot));
            swapRow(LU, i, pivot);
        }

	for( let j=i; j<LU.colSize; j++ ){
	    let sum=0;
	    for( let k=0; k<i; k++ ) sum=add(sum, mul(LU[j][k], LU[k][i]));
	    LU[j][i]=sub(LU[j][i], sum);
	}
   
	const a=div(1.0, LU[i][i]);
	for( let j=i+1; j<LU.colSize; j++ ){
	    let sum=0;
	    for( let k=0; k<i; k++ ) sum=add(sum, mul(LU[i][k], LU[k][j]));
	    LU[i][j]=mul(sub(LU[i][j], sum), a);
	}
    }
		
    let L=new Matrix(LU);
    let U=new Matrix(LU);
    for( let i=0; i<LU.colSize; i++ ) U[i][i]=1;
    for( let i=0; i<LU.colSize; i++ ){
        for( let j=i+1; j<LU.colSize; j++ ){
            L[i][j]=0;
            U[j][i]=0;
        }
    }
    L=mul(P, L);
    return [ L, U, P ];    
}

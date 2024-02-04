import basicOpRow from './basicOpRow.js'
import abs from '../abs.js'
import div from '../div.js'
import minus from '../minus.js'

import swapRow from './swapRow.js'
import searchPivot from './util/searchPivot.js'

import checkMat from './util/checkMat.js'

export default (mat)=>{
    for( let i=0; i<mat.colSize; i++ ){
	const pivot=searchPivot(mat, i);
	if( pivot!=i ) swapRow(mat, pivot, i);
	if( abs(mat[i][i])<1.0e-8 ) continue;
	const val=mat[i][i];
	for( let k=0; k<mat.rowSize; k++ ) mat[i][k]=div(mat[i][k], val);
	for( let j=i+1; j<mat.colSize; j++ ){
	    const val2=mat[j][i];
	    for( let k=0; k<mat.colSize; k++ ){
		mat[j][k]=sub(mat[j][k], mul(val2, mat[i][k]));
	    }
	}
    }

}


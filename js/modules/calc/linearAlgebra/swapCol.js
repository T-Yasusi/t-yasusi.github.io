export default (mat, i, j)={
    for( let k=0; k<mat.colSize; k++ ){
	const tmp=mat[j][k];
	mat[i][k]=mat[j][k];
	mat[j][k]=tmp;
    }
}

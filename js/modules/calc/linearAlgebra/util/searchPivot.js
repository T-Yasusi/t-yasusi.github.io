import abs from '../../abs.js'

export default (mat, pivot)=>{
    let max=abs(mat[pivot][pivot]);
    for( let j=pivot+1; j<mat.colSize; j++ ){
        if( abs(mat[j][pivot])>max ){
            max=abs(mat[j][pivot]);
            pivot=j;
        }
    }
    return pivot;
}

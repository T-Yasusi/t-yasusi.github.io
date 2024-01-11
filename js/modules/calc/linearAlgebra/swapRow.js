export default (mat, i, j)=>{
    const tmp=mat[i];
    mat[i]=mat[j];
    mat[j]=tmp;
}

import Matrix from '../../class/Matrix.js'

export default (size)=>{
    const E=new Matrix(size, size);
    for( let i=0; i<size; i++ ) E[i][i]=1;
    return E;
}

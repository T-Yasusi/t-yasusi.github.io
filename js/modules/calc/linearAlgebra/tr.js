import add from '../add.js'

export default mat=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.tr argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.tr Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);

    let sum=0;
    for( let i=0; i<mat.colSize; i++ ) sum=add(sum, mat[i][i]);
    
    return sum;
}

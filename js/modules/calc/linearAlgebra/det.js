import Matrix from '../class/Matrix.js'
import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

export default mat=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.det argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.det Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);
    const copied=new Matrix(mat);
//    console.log(copied, mat);
    for( let i=0; i<mat.colSize; i++ ){
	for( let j=i+1; j<mat.colSize; j++ ){
	    const coff=div(copied[j][i], copied[i][i]);
	    for( let k=0; k<mat.colSize; k++ ) copied[j][k]=sub(copied[j][k], mul(coff, copied[i][k]));
	}
    }
    let result=1;
    for( let i=0; i<mat.colSize; i++ ) result=mul(result, copied[i][i]);
//    console.log(copied, mat);
    return result;
}

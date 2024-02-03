import Matrix from '../class/Matrix.js'
import tr from './tr.js'
import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'
import minus from '../minus.js'

export default mat=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.frame argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.frame Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);
    
    const E=new Matrix(mat.colSize, mat.rowSize);
    for( let i=0; i<mat.colSize; i++ ) E[i][i]=1;
    
    const coffs=[];
    
    let A=new Matrix(mat);
    let p=tr(A);
    let B=sub(A, mul(p, E));
    coffs.push(p);
    let n=1;
    while( coffs.length<mat.colSize ){
	n++;
	A=mul(mat, B);
	p=div(tr(A), n);
	B=sub(A, mul(p, E));
	coffs.push(p);
    }
    if( mat.colSize%2==1 ) coffs.unshift(-1);
    else coffs.unshift(-1);
    
    return coffs;
}

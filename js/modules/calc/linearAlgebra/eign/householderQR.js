import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'

import Matrix from '../../class/Matrix.js'

import householder from '../QR/householder.js'

const MAX_LOOP=1000;

export default (mat, thre=1.0e-12)=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.eign.householderQR argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.eign.householderQR Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);

    const result=[];
    let A0=new Matrix(mat);
    let [ Q, R ] = householder(A0);
    let A1=mul(R, Q);
    for( let i=0; i<A0.colSize; i++ ) result.push(A1[i][i]);

    let counter=0;
    while( true ){
	counter++;
	A0=A1;
	let [ Q, R ] = householder(A0);
	A1=mul(R, Q);
	for( let i=0; i<A0.colSize; i++ ) result[i]=A1[i][i];
	
	if( Math.max(...result.map((a, i)=> abs(sub(a, A0[i][i]))))<thre ) break;
	if( counter>MAX_LOOP ) throw new Error('!!! linearAlgebra.eign.householderQR !!!');
    }
    //    console.log(counter, result);
    return result;
}

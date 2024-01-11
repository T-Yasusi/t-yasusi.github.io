import Matrix from '../../class/Matrix.js'
import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'

const MAX_LOOP=100000;

export default (mat, thre=1.0e-12)=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.eign.power argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.eign.power Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);
    let v0=(new Vector(Array(mat.colSize).fill(1))).unitVector();
    let v1=mul(mat, v0);
    let lambda=mul(v1, v0);
    let counter=0;
    while( abs(mul(v1,v1)-mul(lambda,lambda))>thre ){
	counter++;
	v0=v1.unitVector();
	v1=mul(mat, v0);
	lambda=mul(v1, v0);
	if( counter>MAX_LOOP ) throw new Error('!!! linearAlgebra.eign.power loop over !!!');
    }
//    console.log(lambda, v1.unitVector());
    return [lambda, v1.unitVector()];
}

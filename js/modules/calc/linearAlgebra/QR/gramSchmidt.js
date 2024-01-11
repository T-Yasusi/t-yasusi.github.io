import Matrix from '../../class/Matrix.js'
import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'

export default (mat)=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.QR.gramSchmidt argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.QR.gramSchmidt Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);

    const Q=new Matrix(mat);
    for( let i=0; i<mat.colSize; i++ ){
	let vec=mat.colVec(i);
	for( let j=0; j<i; j++ ){
	    vec=sub(vec, mul(mul(mat.colVec(i), Q.colVec(j)), Q.colVec(j)));
	}
	if( vec.abs()<10e-8 ) throw new Error('!!! linearAlgebra.eign.gramSchmidt zero vector error !!!');
	Q.setColVec(i, vec.unitVector());
    }
    const R=mul(Q.trans(), mat);

    if( isUpperAngularMatrix(R)===false ) throw new Error('!!! linearAlgebra.eign.gramSchmidt R is not upper angular matrix !!!');
    if( isOrthogonalMatrix(Q)===false ) throw new Error('!!! linearAlgebra.eign.gramSchmidt Q is not orthogonal matrix !!!');
    
    return [ Q, R ];    
}

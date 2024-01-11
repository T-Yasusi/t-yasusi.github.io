import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'

import Matrix from '../../class/Matrix.js'

import isUpperAngularMatrix from '../isUpperAngularMatrix.js'
import isOrthogonalMatrix from '../isOrthogonalMatrix.js'

export default (mat)=>{
    if( (mat instanceof Matrix)===false ) throw new Error('!!! linearAlgebra.QR.haoseholder argment shoud be Matrix !!! '+typeof(mat));
    if( mat.colSize!==mat.rowSize ) throw new Error('!!! linearAlgebra.QR.haoseholder Matrix should be Square !!! '+mat.colSize+' '+mat.rowSize);

    const E=new Matrix(mat.colSize, mat.rowSize);
    for( let i=0; i<E.colSize; i++ ) E[i][i]=1;    
    let Q=new Matrix(E), R=new Matrix(mat);

    for( let i=0; i<mat.colSize-1; i++ ){
	const x=R.colVector(i);
	for( let j=0; j<i; j++ )  x[j]=0;
	const y=new Vector(mat.colSize);
	y[i]=x.abs();
	const u=sub(x, y).unitVector();
	const Tmp=new Matrix(mat.colSize, mat.rowSize);
	for( let i=0; i<Tmp.colSize; i++ ) for( let j=0; j<Tmp.rowSize; j++ ) Tmp[i][j]=mul(u[i], u[j]);
	const H=sub(E, mul(2, Tmp));
	R=mul(H, R);
	Q=mul(Q, H.trans());
    }
//    console.log('Q =', Q, 'R =', R);
    if( isUpperAngularMatrix(R)===false ) throw new Error('!!! linearAlgebra.eign.householder R is not upper angular matrix !!!');
    if( isOrthogonalMatrix(Q)===false ) throw new Error('!!! linearAlgebra.eign.householder Q is not orthogonal matrix !!!');

    return [ Q, R ];
}

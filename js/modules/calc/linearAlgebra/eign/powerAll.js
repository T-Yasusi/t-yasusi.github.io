import Matrix from '../../class/Matrix.js'
import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'

import power from './power.js'

export default (mat, thre=1.0e-12)=>{
    const eignVal=[];
    const eignVec=[];
    let A=new Matrix(mat);
    while( eignVal.length!=mat.colSize ){
	const [ val, vec ] = power(A, thre);
	const X=new Matrix(mat.colSize, mat.rowSize);
	for( let i=0; i<mat.colSize; i++ ){
	    for( let j=0; j<mat.colSize; j++ ){
		X[i][j]=mul(vec[i], vec[j]);
	    }
	}
//	console.log(val, vec);
	eignVal.push(val);
	eignVec.push(vec);
	A=sub(A, mul(val, X));
    }
    return [ eignVal, eignVec ];
}

import frame from '../frame.js'
import bastow from '../../solver/polynomial/bastow.js'
import vector from './vector.js'


export default mat=>{
    const coffs=frame(mat);
    const eignVal=bastow(coffs);

    const P=new Matrix(mat.colSize, mat.colSize);
    for( let i=0; i<mat.colSize; i++ ){
	const vec=vector(mat, eignVal[i]);
	for( let j=0; j<mat.colSize; j++ ){
	    P[j][i]=vec[j];
	}
    }

    return [ eignVal, P ];
}

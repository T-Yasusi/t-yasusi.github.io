import Matrix from '../../class/Matrix.js'

export default (size, i, j)=>{
    const P=new Matrix(size, size);
    for( let k=0; k<size; k++ ) P[k][k]=1;
    if( typeof(i)==='number' && typeof(j)==='number' ){
	for( let k=0; k<size; k++ ){
	    if( k===i ){
		P[k][k]=0;
		P[k][j]=1;
	    }
	    if( k===j ){
		P[k][k]=0;
		P[k][i]=1;
	    }
	}
    }
    else console.log('!!! makePermutationMatrix error return UnitMatrix !!!');
//    console.log('P=', P.toString());
    return P;
}


let index=0;
const buffer=new BigUint64Array(65,536/BigUint64Array.BYTES_PER_ELEMENT);
crypto.getRandomValues(buffer);

const BIGUINT_MAX=18446744073709551615n;

export default {
    getVal: (min=-1, max=1)=>{
	const result=buffer[index];
	index++;
	if( index>buffer.length ){
	    crypto.getRandomValues(buffer);
	    index=0;
	}
//	console.log(buffer);
//	console.log(result);
	return 2*(max-min)*(parseFloat(result/BIGUINT_MAX)-0.5);
    }

}

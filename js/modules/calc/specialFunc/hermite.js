import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'

export default (n, x)=>{
    if( n===0 ) return 1;
    else if( n===1 ) return mul(2, x);
    else{
	let H_n0=1, H_n1=mul(2, x);
	let H_n2=mul(2, sub(mul(x, H_n1), H_n0));
	for( let i=2; i<n; i++ ){
	    H_n0=H_n1;
	    H_n1=H_n2;
	    H_n2=mul(2, sub(mul(x, H_n1), mul(i, H_n0)));
	}
	return H_n2;
    }
}

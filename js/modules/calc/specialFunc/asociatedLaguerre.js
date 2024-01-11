import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

export default (n, m, x)=>{
    if( n===0 ) return 1;
    else if( n===1 ) return sub(m+1, x);
    else{
	let L_n0=1;
	let L_n1=sub(m+1, x);
	let L_n2=div(sub(mul(sub(m-3, x), L_n1), mul(m+1, L_n0)), 2);
	for( let i=2; i<n; i++ ){
            L_n0=L_n1;
            L_n1=L_n2;
	    L_n2=div(sub(mul(sub(2*n+m+3, x), L_n1), mul(n+m+1, L_n0)) ,n+2);
	}
	return L_n2;
    }
}

import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'
import minus from '../minus.js'

export default (n, x)=>{
    if( n===0 ) return 1;
    else if( n===1 ) return sub(1, x);
    else{
        let L_n0=1, L_n1=sub(1, x);
        let L_n2=div(sub(mul(sub(3, x), L_n1), L_n0), 2);
        for( let i=2; i<n; i++ ){
            L_n0=L_n1;
            L_n1=L_n2;
	    L_n2=div(sub(mul(add(2*i, 1, minus(x)),L_n1), mul(i, L_n0)), i+1);
//	    L_n2=sub(mul(add(2*i, 1, minus(x)),L_n1), mul(i, L_n0));
        }
        return L_n2;
    }    
}

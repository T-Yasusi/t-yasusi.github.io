import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

export default (n, x)=>{
    if( n===0 ) return 1;
    else if( n===1 ) return x;
    else{
        let P_n0=1, P_n1=x;
        let P_n2=div(sub(mul(3, x, P_n1), P_n0), 2);
        for( let i=2; i<n; i++ ){
            P_n0=P_n1;
            P_n1=P_n2;
	    P_n2=div(sub(mul(2*i+1, x, P_n1), mul(i, P_n0)), i+1);
        }
        return P_n2;
    }    
}

import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'
import pow from '../pow.js'

export default (l, m, x)=>{
    if( m<0 ) return innerCalc(-m, l, x);
    else return innerCalc(m, l, x);
    
}
function innerCalc(m, l, x){
    if( l<m ) return 0;
    else if( m===l ){
	let a=1;
	for( let i=1; i<=2*m-1; i+=2 ) a*=i;
	return mul(a, pow(sub(1, mul(x,x)), 0.5*m))
    }
    else{
	let a=1;
	for( let i=1; i<=2*m-1; i+=2 ) a*=i;
	let P_n0=0, P_n1=mul(a, pow(sub(1, mul(x, x)), 0.5*m));
	let P_n2=mul(2*m+1, x, P_n1);
//	console.log(P_n1, P_n2);
	
	for( let i=m+1; i<l; i++ ){
            P_n0=P_n1;
            P_n1=P_n2;
//	    console.log('aaa', i);
//	    P_n2=((2*i+3)*x*P_n1-(l+m+1)*P_n0)/(i+2-m);
	    P_n2=div(sub(mul(2*i+1, x, P_n1), mul(i+m, P_n0)), i+1-m);
	}
	return P_n2;
    }
}

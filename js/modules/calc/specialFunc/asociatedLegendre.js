import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import abs from '../abs.js'
import pow from '../pow.js'

export default (m, l, x)=>{
    if( !Number.isInteger(l) || !Number.isInteger(m) ) throw new Error('!!! asociatedLegendre(m, l, x)   l, m must be Interger !!!');
    if( l<0 ) throw new Error('!!! asociatedLendre is not support l<0 !!!');

    const m2=abs(m);
    if( m2>l ) return 0;
    
    if( m2===l===0 ) return 1;
    
    let a=1;
    for( let i=1; i<=2*m-1; i+=2 ) a*=i;

    let P_l2=0;
    let P_l1=mul(a, pow(sub(1, mul(x, x)), 0.5*m2));
    if( m2===l ) return mul(parityFactor(l, m), P_l1);
    let P_l0=mul(2*m2+1, x, P_l1);
        
    for( let i=m2+1; i<l; i++ ){
	P_l2=P_l1;
	P_l1=P_l0;

//	console.log('i=', i, i-m2, 2*i-1, P_l1, i-1+m2, P_l2);
	P_l0=div(sub( mul(2*i+1, x, P_l1), mul(i+m2, P_l2)), i-m2+1);
    }
    return mul(parityFactor(l, m), P_l0);
}

function parityFactor(l, m){
    if( m>=0 ) return 1;

    let deno=1;
    for( let i=l+m+1; i<=l-m; i++ ) deno*=i;

//    console.log(l, m, deno);
    if( m%2===0 ) return 1/deno;
    else return -1/deno;
}
    

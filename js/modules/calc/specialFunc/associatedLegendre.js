import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import pow from '../pow.js'

export default (m, l, x)=>{
    if( l<m ){
	console.log('associatedLegendre l<m  return 0');
	return 0;
    }
    else if( m===l && l===0 ) return 1;
    else{
	let P_l2=0;
	let P_l1=pow(sub(1, mul(x, x)), 0.5*m);
	if( m===l ) return P_l1;
	let P_l=
	

	
	// let P_l2 = pow(sub(1, mul(x, x)), 0.5*m);
	// if( m===l-1 ) return P_l1;
	
	// for( let i=m; i>0; i-=2 ) P_l2 = mul(2*m-1, P_l2);
	// P_l1 = mul((2m-1)/2m, x, P_l2);

	// P_l0=mul(x, P_l1);
    }
}

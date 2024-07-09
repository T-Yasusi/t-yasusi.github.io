import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'
import minus from '../minus.js'
import factorial from '../factorial.js'

export default (m, n, x)=>{ // L^m_n(x)
    if( n<0 ) throw new Error('!!! associatedLaguerre not suport n<0 !!!');
    if( m<0 ) throw new Error('!!! associatedLaguerre not suport m<0 !!!');
    if( n<m ){
	console.log('associatedLaguerre n<m  return 0;');
	return 0;
    }
    if( m===0 && n===0 ) return 1;
    
    let L_l0=1;
    let L_l1=sub(1+m, x);
    if( n===1 ) return L_l1;
    let L_l2=div(sub(mul(sub(m+3, x), L_l1), mul(m+1, L_l0)), 2);

    for( let i=2; i<n; i++ ){
	L_l0=L_l1;
	L_l1=L_l2;
	L_l2=div(sub(mul(sub(2*i+1+m, x), L_l1), mul((i+m), L_l0)), i+1); 
    }
    return L_l2;
}

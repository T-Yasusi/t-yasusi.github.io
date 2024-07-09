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

    let L_l2=0;
    let L_l1=mul(pow(-1, m), factorial(m));
//    console.log('m =', m, ' n=', n, ' L_l1=', L_l1);
    if( m===n ) return L_l1;
    let L_l0=mul(m+1, sub(m+1, x), L_l1);

//    console.log('x=', x, 'L_l0 =', L_l0);
    for( let i=m+1; i<n; i++ ){
	L_l2=L_l1;
	L_l1=L_l0;

	L_l0=div(sub(mul(i+1, sub(2*i+1-m, x), L_l1), mul(i*i*(i+1), L_l2)) , i+1-m)
    }
    return L_l0;
}

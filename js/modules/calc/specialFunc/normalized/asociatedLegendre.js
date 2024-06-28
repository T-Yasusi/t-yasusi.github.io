import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import abs from '../../abs.js'
import pow from '../../pow.js'
import sqrt from '../../sqrt.js'
import minus from '../../minus.js'

export default (m, l, x)=>{
    if( !Number.isInteger(l) || !Number.isInteger(m) ) throw new Error('!!! asociatedLegendre(m, l, x)   l, m must be Interger !!!');
    if( l<0 ) throw new Error('!!! asociatedLendre is not support l<0 !!!');

    const m2=abs(m);
    if( m2>l ) return 0;

    if( m2===l===0 ) return 1;

    let P_l2=0;
    let a=(2*m2+1)/2;
    for( let i=1; i<=2*m2; i++ ) a/=i;
    a=sqrt(a);
    for( let i=2*m2-1; i>0; i-=2 ) a*=i;
    let P_l1=mul(a, pow(sub(1, mul(x, x)), 0.5*m2));

    if( m2===l ) return m2===m ? P_l1 : mul(pow(-1, m2), P_l1);
    let P_l0=mul(sqrt(2*m2+3), x, P_l1);

    for( let i=m2+1; i<l; i++ ){
	P_l2=P_l1;
	P_l1=P_l0;
	
	P_l0=div( sub( mul(sqrt((2*i+1)*(2*i+3)), x, P_l1), mul(sqrt(div((2*i+3)*(i+m2)*(i-m2), 2*i-1)), P_l2)), sqrt((i+1+m2)*(i+1-m2)));
    }

    return m2===m ? P_l0 : mul(pow(-1, m2), P_l0);
}

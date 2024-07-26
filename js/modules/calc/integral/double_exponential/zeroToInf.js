import util from '../../util.js'

import minus from '../../minus.js'
import abs from '../../abs.js'
import exp from '../../exp.js'

import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'

import cosh from '../../cosh.js'
import sinh from '../../sinh.js'
import tanh from '../../tanh.js'

import trapezoid from '../trapezoid.js'

const TEST_VALUE=1.0e8;
const TEST_THRE=1.0e-8;

export default (f, thre=1.0e-8)=>{
    if( abs(f(TEST_VALUE))>TEST_THRE ) throw new Error('!!! integral.zeroToInf Function f(x) must not diverge !!!');
    // const integradFunc=t=>{ // DEBUG
    // 	console.log('t =', t, f(exp(mul(0.5*Math.PI, sinh(t)))), mul(0.5*Math.PI, cosh(t), exp(mul(0.5*Math.PI, sinh(t))))); 
    // 	return mul(f(exp(mul(0.5*Math.PI, sinh(t)))), mul(0.5*Math.PI, cosh(t), exp(mul(0.5*Math.PI, sinh(t)))));
    // }

    const integradFunc=t=> mul(f(exp(mul(0.5*Math.PI, sinh(t)))), mul(0.5*Math.PI, cosh(t), exp(mul(0.5*Math.PI, sinh(t)))));
    const innerIntegral=x=> trapezoid(integradFunc, -x, x);

    let max_range=TEST_VALUE;
    while( util.isNaN(integradFunc(max_range)) ) max_range*=0.5;

    let range=0.1*max_range;
    const step=range;
//    console.log(range, innerIntegral(range)); // DEBUG

    let val1=innerIntegral(range), val2=innerIntegral(range+step);

    while( true ){
        range+=step;
        val1=val2;
        val2=innerIntegral(range+step);

        if( abs(val1)>1 && abs(sub(val1, val2))/abs(val1)<thre ) break;
	if( abs(sub(val1, val2))<thre ) break;

//	console.log(val1, abs(val1), val2, abs(val2), sub(val1, val2), abs(sub(val1, val2))); // DEBUT
        if( util.isNaN(val1) || util.isNaN(val2) ) throw new Error('!!! integral.zeroToInf not converged !!! \n Integral become NaN');
    }

    return val2;
}

import minus from '../../minus.js'
import abs from '../../abs.js'
import exp from '../../exp.js'
import pow from '../../pow.js'

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
    const integradFunc=t=> mul(f(tanh(mul(0.5*Math.PI, sinh(t)))), 0.5*Math.PI, div(cosh(t), pow(cosh(mul(0.5, Math.PI, sinh(t))), 2)));
    const innerIntegral=x=> trapezoid(integralFunc, -x, x);

    let max_range=TEST_VALUE;
    while( util.isNaN(integradFunc(max_range)) ) max_range*=0.5;

    let range=0.1*max_range;
    const step=range;

    while( true ){
        range+=step;
        val1=val2;
        val2=innerIntegral(range+step);

        if( abs(val1)>1 && abs(sub(val1, val2))/abs(val1)<thre ) break;
	if( abs(sub(val1, val2))<thre ) break;

        console.log(val1, abs(val1), val2, abs(val2), sub(val1, val2), abs(sub(val1, val2)));
	if( util.isNaN(val1) || util.isNaN(val2) ) throw new Error('!!! integral.minusOneToOne not converged !!! \n Integral become NaN');
    }

    return val2;
}



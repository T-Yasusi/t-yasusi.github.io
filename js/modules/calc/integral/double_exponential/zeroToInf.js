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

import calc from './calc.js'
import trapezoid from '../trapezoid.js'

const TEST_VALUE=1.0e8;
const TEST_THRE=1.0e-8;

export default (f, thre=1.0e-8)=>{
    if( f(TEST_VALUE) ) throw new Error('!!! integral.minusInfToInf Function f(x) must not diverge !!!');
    const integradFunc=t=> mul(f(exp(mul(0.5*Math.PI, sinh(t)))), mul(0.5*Math.PI, cosh(t), exp(mul(0.5*Math.PI, sinh(t)))));
    const innerIntegral=x=> trapezoid(integradFunc, -x, x);

    let max_range=TEST_VALUE;
    while( Number.isNaN(integradFunc(max_range)) || Number.isNaN(integradFunc(minus(max_range))) ) max_range*=0.5;

    let range=0.1*max_range;
    const step=range;

    console.log(range, integradFunc(range), integradFunc(minus(range)));
    for( let x=range; x<max_range; x+= step ) console.log(x, integradFunc(minus(x)), integradFunc(x));

    while( integradFunc(minus(range))>1.0e-4 || integradFunc(range)>1.0e-4 ){
        range+=step;
        if( range>max_range ) throw new Error('!!! integral.zeroToInf not found valid range !!!');
    }
    console.log(range);

    let val1=innerIntegral(range), val2=innerIntegral(range+step);
    while( true ){
        range+=step;
        val1=val2;
        val2=innerIntegral(range+step);
        console.log(range, val1, val2, abs(val1-val2), thre);
        if( abs(val1)>1 && abs((val1-val2)/val1)<thre ) break;
        if( abs(val1-val2)<thre ) break;

        if( Number.isNaN(val1) || Number.isNaN(val2) ) throw new Error('!!! integral.zeroToInf not converged !!!');
    }

    return val2;
}
    
    
    
 //    // const convFunc=t=> f(exp(mul(0.5*Math.PI, sinh(t))));
//     // const weight=t=>mul(0.5*Math.PI, cosh(t), exp(mul(0.5*Math.PI, sinh(t))));


    
//     let x_max=6.75;
//     while( Number.isNaN(convFunc(x_max)) || Number.isNaN(convFunc(minus(x_max))) ) x_max=sub(x_max, 1);
//     let x=x_max;
//     while( abs(convFunc(x))<thre && abs(convFunc(minus(x)))<thre ) x=sub(x, 0.01);

//     const h=div(sub(x_max, x), 10);
//     let val=trapezoid(t=> mul(convFunc(t), weight(t)), minus(x), x);
//     let next=mul(h, add(mul(convFunc(x), weight(x)), mul(convFunc(minus(x)), weight(minus(x)))));
//     while( abs(next)> thre ){
//         val=add(val, next);
//         x=add(x, h);
//         next=mul(h, add(mul(convFunc(x), weight(x)), mul(convFunc(minus(x)), weight(minus(x)))));
//     }
//     return val;
// }    





import minus from '../../minus.js'
import abs from '../../abs.js'

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
    if( f(TEST_VALUE) || f(minus(TEST_VALUE)) ) throw new Error('!!! integral.minusInfToInf Function f(x) must not diverge !!!');
    
    const integradFunc=t=> mul(f(sinh(mul(0.5*Math.PI, sinh(t)))), mul(0.5*Math.PI, cosh(t), cosh(mul(0.5*Math.PI, sinh(t)))));
    const innerIntegral=x=> trapezoid(integradFunc, minus(x), x);
    
    let max_range=TEST_VALUE;
    while( Number.isNaN(integradFunc(max_range)) || Number.isNaN(integradFunc(minus(max_range))) ) max_range*=0.5;
    
    let range=0.1*max_range;
    const step=range;
    
//    console.log(range, integradFunc(range), integradFunc(minus(range)));
    for( let x=range; x<max_range; x+= step ) console.log(x, integradFunc(minus(x)), integradFunc(x));

    while( integradFunc(minus(range))>1.0e-4 || integradFunc(range)>1.0e-4 ){
	range+=step;
	if( range>max_range ) throw new Error('!!! integral.minusInfToInf not found valid range !!!');
    }
//    console.log(range);

    let val1=innerIntegral(range), val2=innerIntegral(range+step);
    while( true ){
	range+=step;
	val1=val2;
	val2=innerIntegral(range+step);
//	console.log(range, val1, val2, abs(val1-val2), thre);
	if( abs(val1)>1 && abs((val1-val2)/val1)<thre ) break;
	if( abs(val1-val2)<thre ) break;
	
	if( range>max_range ) throw new Error('!!! integral.minusInfToInf not converged !!!');
    }

    return val2;
}



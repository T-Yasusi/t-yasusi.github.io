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

export default (f, thre=1.0e-8)=>{
    const convFunc=t=> f(sinh(mul(0.5*Math.PI, sinh(t))));
    const weight=t=>mul(0.5*Math.PI, cosh(t), cosh(mul(0.5*Math.PI, sinh(t))));
    
    let x_max=6.75;
    while( Number.isNaN(convFunc(x_max)) || Number.isNaN(convFunc(minus(x_max))) ) x_max=sub(x_max, 1);
    let x=x_max;
    while( abs(convFunc(x))<thre && abs(convFunc(minus(x)))<thre ) x=sub(x, 0.01);

    const h=div(sub(x_max, x), 10);
    let val=trapezoid(t=> mul(convFunc(t), weight(t)), minus(x), x);
    let next=mul(h, add(mul(convFunc(x), weight(x)), mul(convFunc(minus(x)), weight(minus(x)))));
    while( abs(next)> thre ){
	val=add(val, next);
	x=add(x, h);
	next=mul(h, add(mul(convFunc(x), weight(x)), mul(convFunc(minus(x)), weight(minus(x)))));
    }
    return val;
}

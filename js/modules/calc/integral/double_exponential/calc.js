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

export default (f, w, h, thre=1.0e-8)=> innerCalc(f, w, h, thre=1.0e-8);

function innerCalc(f, w, h, thre){
    let i=1;
    let x=mul(i, h);
    let val=mul(h, add(mul(f(x), w(x)), mul(f(0), w(0)), mul(f(minus(x)), w(minus(x)))));
    i++;
    x=mul(i, h);
    let next=mul(h, add(mul(f(x), w(x)), mul(f(minus(x)), w(minus(x)))));
    val=add(val, next);
    while( abs(next)>thre ){
	i++;
        x=mul(i, h);
	next=mul(h, add(mul(f(x), w(x)), mul(f(minus(x)), w(minus(x)))));
	val=add(val, next);
	if( Number.isNaN(val) ){
	    console.log('NAN', h);
	    return innerCalc(f, w, mul(0.1, h), thre);
	}
    }
//    console.log(val);
    return val;
}

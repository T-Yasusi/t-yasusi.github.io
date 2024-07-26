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

export default (f, thre=1.0e-8)=>{
    const convFunc=t=> f(tanh(mul(0.5*Math.PI, sinh(t))));
}


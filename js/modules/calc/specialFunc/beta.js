import Complex from '../class/Complex.js'

import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import pow from '../pow.js'

import integral from '../integral.js'

export default (x, y)=>{
    return integral.simpson(t=> mul(pow(t, sub(x, 1)), pow(1-t, sub(y, 1))), 0, 1);
}

import Complex from './class/Complex.js';
import sin from './sin.js';
import cos from './cos.js';

export default x=>{
    if( typeof(x)==='number' ) return Math.tan(x);
    if( x instanceof Complex ){
	return sin(x).div(cos(x));
    }
    throw new Error('!!! tan invailed type !!! '+typeof(x));
}

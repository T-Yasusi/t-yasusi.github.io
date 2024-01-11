import Complex from './class/Complex.js';
import exp from './exp.js';

export default x=>{
    if( typeof(x)==='number' ) return Math.cos(x);
    if( x instanceof Complex ){
	return (exp(x.mul(new Complex(0, 1))).add(exp(x.mul(new Complex(0, -1))))).div(2);
    }
    throw new Error('!!! cos invailed type !!! '+typeof(x));
}

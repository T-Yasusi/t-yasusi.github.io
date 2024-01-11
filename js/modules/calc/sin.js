import Complex from './class/Complex.js';
import exp from './exp.js';

export default x=>{
    if( typeof(x)==='number' ) return Math.sin(x);
    if( x instanceof Complex ){
	return (exp(x.mul(new Complex(0, 1))).sub(exp(x.mul(new Complex(0, -1))))).div(new Complex(0, 2));
    }
    throw new Error('!!! sin invailed type !!! '+typeof(x));
}

import Complex from './class/Complex.js';
import exp from './exp.js';

export default (x)=>{
    if( typeof(x)==='number' ) return Math.cosh(x);
    if( x instanceof Complex ){
        return exp(x).add(exp(x.minus())).div(2);
    }
    throw new Error('!!! cinh invailed type !!! '+typeof(x));
}

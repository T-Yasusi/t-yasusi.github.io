import Complex from './class/Complex.js';
import exp from './exp.js';

export default (x)=>{
    if( typeof(x)==='number' ) return Math.tanh(x);
    if( x instanceof Complex ){
        return exp(x).sub(exp(x.minus())).div(exp(x).add(exp(x.minus())));
    }
    throw new Error('!!! tanh invailed type !!! '+typeof(x));
}

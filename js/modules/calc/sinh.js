import Complex from './class/Complex.js';
import exp from './exp.js';

export default (x)=>{
    if( typeof(x)==='number' ) return Math.sinh(x);
    if( x instanceof Complex ){
        return exp(x).sub(exp(x.minus())).div(2);
    }
    throw new Error('!!! sinh invailed type !!! '+typeof(x));    
}

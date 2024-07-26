import Complex from './class/Complex.js';

export default x=>{
    if( typeof(x)==='number' ) return Math.log(x);
    if( x instanceof Complex ) return new Complex(Math.log(x.abs()), x.arg());

    new Error('!!! log invailed type !!! '+typeof(x));
}


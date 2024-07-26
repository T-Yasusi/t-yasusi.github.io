import Complex from './class/Complex.js';
import exp from './exp.js';
import log from './log.js';

export default (x, i)=>{
    if( typeof(x)==='number' && typeof(i)==='number' ) return Math.pow(x, i);
    if( x instanceof Complex && typeof(i)==='number' ){
	const r=Math.pow(x.abs2(), i/2);
	const theta=x.arg()*i;
	
	return new Complex(r*cos(theta), r*sin(theta));
    }
    if( i instanceof Complex ){
	return exp(mul(i, log(x)));
    }
    
    throw new Error('!!! pow invailed type !!! '+typeof(x));
}

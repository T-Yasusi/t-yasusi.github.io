import Complex from './class/Complex.js';
import exp from './exp.js';
import log from './log.js';

export default (x, i)=>{
    if( typeof(x)==='number' && x===0 ){
	if( typeof(i)==='number' ){
	    if( i===0 ) return 1;
	    if( i>0 ) return 0;
	    if( i<0 ) return Infinity;
	}
	if( i instanceof Complex ){
	    if( i.re===0 ) return NaN;
	    if( i.re>0 ) return new Complex(0, 0);
	    if( i.re<0 ) return Infinity;
	}
    }
    
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

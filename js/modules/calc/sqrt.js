import Complex from './class/Complex.js';

export default x=>{
    if( typeof(x)==='number' ){
	if( x<0 ) return new Complex(0, Math.sqrt(-x));
	else  return Math.sqrt(x);
    }
    if( x instanceof Complex ){
	const r=pow(x.abs2(), 1/4);
	const theta=x.arg();
        return new Complex(r*sin(theta), r*cos(theta));
    }
    throw new Error('!!! sqrt invailed type !!! '+typeof(x));
}



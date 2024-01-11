import Complex from './class/Complex.js';

export default x=>{
    if( typeof(x)==='number' ) return Math.exp(x);
    if( x instanceof Complex ){
	const r=Math.exp(x.re);
	const theta=x.im;

	return new Complex(r*Math.cos(theta), r*Math.sin(theta));
    }
    
    throw new Error('!!! exp invailed type !!! '+typeof(x));
}

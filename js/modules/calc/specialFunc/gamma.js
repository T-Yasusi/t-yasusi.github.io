import Complex from '../class/Complex.js'

import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import factorial from '../factorial.js'
import pow from '../pow.js'

import integral from '../integral.js'

import util from '../util.js'

export default x=>{
    if( !util.isNumerical(x) ) throw new Error(`!!! specialFunc.gamma support number and Complex !!! \n typeof(${x})`);
    
    if( typeof(x)==='number' && x===0 ) return Infinity;
    if( typeof(x)==='number' && Number.isInteger(x) && x>0 ) return factorial(x-1);
    if( typeof(x)==='number' && Number.isInteger(x) && x<0 ) return Infinity;

    const real= x instanceof Complex ? x.re : x;
    const absReal=Math.abs(real);
    const n0=Math.floor(absReal);

    if( 1<=real ){
	let x0=sub(x, n0-1);
//	console.log(x, x0, n0);
	let val=integral.double_exponential.zeroToInf((t)=> mul(pow(t, sub(x0, 1)), exp(-t)) );
	for( let i=1; i<n0; i++ ){
	    val=mul(x0, val);
	    x0=add(x0, 1);
	}
	return val;
    }
    else{
	let x0=sub(add(x, n0+2));
	let val=integral.double_exponential.zeroToInf((t)=> mul(pow(t, sub(x0, 1)), exp(-t)) );	
	for( let i=0; i<n0+2; i++ ){
	    x0=sub(x0, 1);
	    val=div(val, x0);
	}
	return val;
    }
}


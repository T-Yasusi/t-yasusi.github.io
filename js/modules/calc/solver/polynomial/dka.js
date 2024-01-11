import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'
import abs from '../../abs.js'
import exp from '../../exp.js'
import pow from '../../pow.js'
import Complex from '../../class/Complex.js'

import newton from '../newton.js'

const MAX_LOOP=1000;

export default (coffs, thre=1.0e-8)=>{
    if( abs(coffs[0], 1)>1.0e-8 ) for( let i=coffs.length-1; i>=0; i-- ) coffs[i]=div(coffs[i], coffs[0]);

    const func=x=>{
	let result=0;
	for( let i=0; i<coffs.length; i++ ) result=add(result, mul( coffs[i], pow(x, coffs.length-i-1)));
	return result;
    }
    
    const r=aberthR(coffs, div(mul(-1, coffs[1]), coffs.length-1));
    const z0=[];
    for( let i=0; i<coffs.length-1; i++ ){
	z0.push(add(div(mul(-1, coffs[1]), coffs.length-1), mul(r, exp(mul(new Complex(0, 1), 2*Math.PI*(i-1)/coffs.length+1/4)))));
    }
    const z1=[];
    for( let i=0; i<z0.length; i++ ){
	let num=1;
	for( let j=0; j<z0.length; j++ ){
	    if( i===j ) continue;
	    num=mul(num, sub(z0[i], z0[j])); 
	}
	z1.push(sub(z0[i], div(func(z0[i]), num)));
    }

    let counter=0;
    while( Math.max(...z1.map(z=> abs(func(z))))>thre ){
	counter++;
	for( let i=0; i<z0.length; i++ ){
	    let num=1;
	    for( let j=0; j<z0.length; j++ ){
		if( i===j ) continue;
		num=mul(num, sub(z0[i], z0[j])); 
	    }
	    z1[i]=sub(z0[i], div(func(z0[i]), num));
	}
	// console.log( z1 );	
	// console.log( z1.map(z=> abs(func(z))) );	
	for( let i=0; i<z0.length; i++ ) z0[i]=z1[i];
	if( counter>MAX_LOOP ) throw new Error('!!! solver.polynomial.dka loop over '+MAX_LOOP+' !!!');
    }
    return z1;
}

function aberthR(coffs, x0){
    let a=[ ...coffs ];
    const a2=[];
    for( let i=0; i<coffs.length; i++ ){
	const b=[];
	let val=a[0];
	for( let j=1; j<a.length; j++ ){
	    b.push(val);
	    val=add(mul(x0, val), a[j]);
	}
	a2.push(val);
	a=b;

    }
    a2.reverse();
//    console.log(a2);
    const func=x=>{
	let val=mul(abs(a2[0]), pow(x, a2.length-1));
	for( let i=1; i<a2.length; i++ )  val=sub(val, mul( abs(coffs[i]), pow(x, coffs.length-i-1)));
	return val;
    }
    const r=newton(func, 10000);
//    console.log(r);
    return r;
}

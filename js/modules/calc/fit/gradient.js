import calcChi2 from './calcChi2.js'
import Vector from '../class/Vector.js'
import solver from '../solver.js'

import add from '../add.js'
import mul from '../mul.js'
import diff from '../diff.js'

const THRESHOLD=1.0e-3;
const MAX_LOOP=10;

export default (data_x, data_y, par, func, log_level)=>{
    console.log('===== Gradient Method START =====');
    par=new Vector(...par);
    
    const evalFunc=(x)=>{ return calcChi2(data_x, data_y, x, func); };    
    let grad=nabla(evalFunc, par);
    
    let counter=0;
    while( calc(grad)>THRESHOLD ){
	const gradFunc=(t)=>{ return mul(nabla(evalFunc, add(par, mul(t, grad))), grad); };
	const ans=solver.newton(gradFunc, 0);
//	for( let t=-0.01; t<0.01; t+=0.001 ) console.log('t =', t, ' f(t) =', gradFunc(t)); 
	console.log(ans);

	grad=nabla(evalFunc, add(par, mul(ans, grad)));
	console.log(grad.unitVector());
	counter++;
	console.log('Counter =', counter);
	if( counter>=MAX_LOOP ){
	    console.log(`Gradient Method Iteration over ${MAX_LOOP}`);
	    break;
	}
    }
    
    console.log('===== Gradient Method FINISH =====');    
}

function calc(v){
    let result=0;
    for( let i=0; i<v.length; i++ ) result+=v[i]*v[i];

    let str='[ ';
    for( let i=0; i<v.length; i++ ) str+=v[i]+', ';
    str=str.slice(0, -2)+' ]';
    console.log('grad ', str, '  |grad|^2 =', result);

    return result;
}

function nabla(func, x, dx=1.0e-6){
    const result=new Vector(x.length);
    for( let i=0; i<x.length; i++ ){
	const x0=[ ...x ], x1=[ ...x ];
	x0[i]-=0.5*dx; x1[i]+=0.5*dx;
	result[i]=(func(x1)-func(x0))/dx;
    }
    return result;
}

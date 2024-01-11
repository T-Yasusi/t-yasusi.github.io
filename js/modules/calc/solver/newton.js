import diff from '../diff.js'
const MAX_LOOP=10000;

export default (func, x0, thre=1.0e-8)=>{
    let x1=x0-func(x0)/diff.central(func, x0);

    let counter=0;
    while( Math.abs(x0-x1)>thre ){
	counter++;
	x0=x1;
	x1=x0-func(x0)/diff.central(func, x0);
	if( counter>MAX_LOOP) throw new Error('!!! solver.newton max loop over !!!');
    }

    return x1;
}

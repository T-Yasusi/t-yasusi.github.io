import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'

export default (func, x, y, dx=1.0e-8, nStep=1000)=>{
    const result=[ y ];
    for( let i=0; i<nStep; i++ ){
	const k1=mul(dx, func(x, y));
	const k2=mul(dx, func(x+0.5*dx, add(y, mul(0.5, k1))));
	const k3=mul(dx, func(x+0.5*dx, add(y, mul(0.5, k2))));
	const k4=mul(dx, func(x+dx, add(y, k3)));
	y=add(y, mul(1/6, add(k1, mul(2, k2), mul(2, k3), k4)));
	x+=dx;
	result.push(y);
    }
    return result;
}

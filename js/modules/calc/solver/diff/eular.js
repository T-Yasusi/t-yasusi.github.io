import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'

export default (func, x, y, dx=1.0e-8, nStep=1000)=>{
    const result=[ y ];
    for( let i=0; i<nStep; i++ ){
	y=add(y, mul(dx, func(add(x, mul(i, dx)), y)));
	result.push(y);
    }
    return result;
}

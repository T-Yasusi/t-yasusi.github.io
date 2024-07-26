import add from '../add.js';
import sub from '../sub.js';
import mul from '../mul.js';
import div from '../div.js';

export default (f, x0, x1, N=500)=>{
    const dx=div(sub(x1, x0), N);
    let sum1=0, sum2=0;
    for( let i=2; i<N; i+=2 ) sum2=add(sum2, f(add(x0, mul(i, dx))));
    for( let i=1; i<N; i+=2 ) sum1=add(sum1, f(add(x0, mul(i, dx))));

//    console.log(div(dx, 3), f(x0), mul(4, sum1), mul(2, sum2), f(x1)); // DEBUG
    return mul(div(dx, 3), add(f(x0), mul(4, sum1), mul(2, sum2), f(x1)));
}

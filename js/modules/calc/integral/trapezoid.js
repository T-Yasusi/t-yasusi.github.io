import add from '../add.js';
import sub from '../sub.js';
import mul from '../mul.js';
import div from '../div.js';

export default (f, x0, x1, N=1000)=>{
    const dx=div(sub(x1, x0), N);
    let val=0;
    for( let i=0; i<N; i++ ) val=add(val, f(add(x0, mul(i, dx))), f(add(x0, mul(i+1, dx))));
    return mul(mul(0.5, dx), val);
}

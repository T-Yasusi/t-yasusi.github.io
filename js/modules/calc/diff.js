import add from './add.js';
import sub from './sub.js';
import mul from './mul.js';
import div from './div.js';

export default {
    forward: (f, x, dx=1.0e-8)=>{
	return div(sub(f(add(x, dx)), f(x)), dx);
    },

    central: (f, x, dx=1.0e-8)=>{
	return div(sub(f(add(x, mul(0.5, dx))), f(sub(x, mul(0.5, dx)))), dx);
    },
    
    backward: (f, x, dx=1.0e-8)=>{
	return div(sub(f(x), f(sub(x, dx))), dx);
    }
}

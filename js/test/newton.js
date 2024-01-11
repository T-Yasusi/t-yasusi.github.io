const n=2;
const func=(x)=>{ return x*x-n; };
let x0=n;
let x1=x0-func(x0)/diff.central(func, x0);

let counter=0;
while( Math.abs(x0-x1)>1.0e-8 ){
    counter++;
    x0=x1;
    x1=x0-func(x0)/diff.central(func, x0);
    output.log('Iteration =', counter, ' x=', x1, 'dx =', Math.abs(x0-x1));
}
output.log('x =', x1, '  calc =', Math.sqrt(n));

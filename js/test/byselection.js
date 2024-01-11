const n=2;
const func=x=>{ return x*x-2; };
let x0=0, x1=n;
let y0=func(x0), y1=func(x1);
let counter=0;

while( Math.abs(x0-x1)>1.0e-8 ){
    counter++;
    if( y0*y1>0 ) throw new Error('!!! Byselection same sign !!!');
    const x_c=0.5*(x0+x1);
    const y_c=func(x_c);
    if( y_c*y0<0 ) x1=x_c;
    else x0=x_c;
    output.log('Iteration =', counter, ' f(', x_c, ') =', y_c);
}

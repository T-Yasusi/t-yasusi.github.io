const i=new Complex(0, 1);
const zero=new Complex(0, 0);
const c0=new Complex(1, 0);
const c1=new Complex(-1, 0);
const c2=new Complex(0, -1);
const c3=new Complex(2, -1);

output.log(i);
output.log(zero);
output.log(c0);
output.log(c1);
output.log(c2);
output.log(c3);

output.math(i);
output.math(zero);
output.math('c0 =', c0);
output.math('c1 =', c1);
output.math('c2 =', c2);
output.math('c3 =', c3);

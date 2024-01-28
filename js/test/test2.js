output.log(1+1);

const e0=new Vector(1, 0, 0);
const e1=new Vector(0, 1, 0);
const e2=new Vector(0, 0, 1);

output.log(e1 instanceof Vector);
output.log(add(e0, e1));
output.log(e0-e1);
output.log(e0*(e1+e0));
// output.log(e0/2);


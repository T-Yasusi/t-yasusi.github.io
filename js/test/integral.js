const func=(x)=>{ return cos(x); }

output.log('trapezoid =', integral.trapezoid(func, 0, 1));
output.log('simpson =', integral.simpson(func, 0, 1));
output.log('calc =', Math.sin(1));

const func2=(x)=>{ return div(1, x); }

const z1=new Complex(1, 1), z2=new Complex(1, -1), z3=new Complex(-1, -1), z4=new Complex(-1, 1);
output.log('loop integral =', add(integral.simpson(func, z1, z2),
				 integral.simpson(func, z2, z3),
				 integral.simpson(func, z3, z4),
				 integral.simpson(func, z4, z1)));

output.log('residue(1/z) =', add(integral.simpson(func2, z1, z2),
				integral.simpson(func2, z2, z3),
				integral.simpson(func2, z3, z4),
				integral.simpson(func2, z4, z1)));


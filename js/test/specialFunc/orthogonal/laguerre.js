const N=10;
const THRESHOLD=1e-5;

for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
	const val=integral.double_exponential.zeroToInf((x)=> specialFunc.laguerre(i, x)*specialFunc.laguerre(j, x)*exp(-x));
	const true_val=i===j ? 1 : 0;

	if( abs(val-true_val)>THRESHOLD ){
	    output.math(`\\int^{\\infty}_{0} L_{${i}}(x) Lx_{${j}}(x) dx =`, val, '\\hspace{5mm} true =', true_val);
	}
    }
}

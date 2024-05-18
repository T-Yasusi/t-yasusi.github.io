const N=10;
const THRESHOLD=1e-5;

for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
	const val=integral.double_exponential.minusInfToInf((x)=> specialFunc.hermite(i, x)*specialFunc.hermite(j, x)*exp(-x*x));
	const true_val=i===j ? sqrt(Math.PI)*pow(2, i)*factorial(i) : 0;

	if( abs(val-true_val)>THRESHOLD ){
	    output.math(`\\int_{-\\infty} ^{\\infty} H_{${i}}(x) H_{${j}}(x) e^{-x^2}dx =`, val, '\\hspace{5mm} true =', true_val);
	}
    }
}

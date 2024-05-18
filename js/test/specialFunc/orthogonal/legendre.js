const N=10;
const THRESHOLD=1e-5;

for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
	const val=integral.simpson((x)=> specialFunc.legendre(i, x)*specialFunc.legendre(j, x) , -1, 1);
	const true_val=i===j ? 2/(2*i+1) : 0;
	
	if( abs(val-true_val)<THRESHOLD ){
	    output.math(`\\int^1_{-1} P_{${i}}(x) P_{${j}}(x) dx =`, val, '\\hspace{5mm} true =', true_val);  
	}
    }
}

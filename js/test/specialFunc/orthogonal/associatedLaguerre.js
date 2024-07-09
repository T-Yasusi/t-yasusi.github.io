const maxL=1;
const THRESHOLD=1e-5;

for( let l=0; l<=maxL; l++ ){
    for( let k=0; k<=maxL; k++ ){
	const maxM=l>k ? k : l;
	for( let m=0; m<=maxM; m++ ){
	    const val=integral.double_exponential.zeroToInf((x)=> specialFunc.associatedLaguerre(m, l, x)*specialFunc.associatedLaguerre(m, k, x)*exp(-x)*pow(x, m));
	    const true_val= orthogonalVal(m, l, k);
  //          if( abs(val-true_val)>THRESHOLD ){

	    output.math(`\\int^1_{-1} P^{${m}}_{${l}}(x) P^{${m}}_{${k}}(x) dx =`, val, '\\hspace{5mm} true =', true_val);
//	    output.math(`\\int^{\\infty}_{0} L^{${m}}_{${l}}(x) L^{${m}}_{${k}}(x) e^{-x} x^{${m}}dx =`, val);
//	    }
	}
    }
}

function orthogonalVal(m, l, k){
    if( l!==k ) return 0;
    
    let val=1.0;
    for( let i=m+l; i>k; i-- ) val*=i;
    return val;
}

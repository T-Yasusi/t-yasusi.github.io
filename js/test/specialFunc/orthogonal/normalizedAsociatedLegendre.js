const maxL=2;
const THRESHOLD=1e-5;

for( let l=0; l<=maxL; l++ ){
    for( let k=0; k<=maxL; k++ ){
	const maxM=l>k ? k : l;
	for( let m=-maxM; m<=maxM; m++ ){
	    const val=integral.simpson((x)=> specialFunc.normalized.asociatedLegendre(m, l, x)*specialFunc.normalized.asociatedLegendre(m, k, x), -1, 1);
	    const true_val= l===k ? 1 : 0;
            if( abs(val-true_val)>THRESHOLD ){
               output.math(`\\int^1_{-1} P^{${m}}_{${l}}(x) P^{${m}}_{${k}}(x) dx =`, val, '\\hspace{5mm} true =', true_val);
	    }
	}
    }
}


const maxL=2;
const THRESHOLD=1e-5;

for( let l=0; l<=maxL; l++ ){
    for( let k=0; k<=maxL; k++ ){
	const maxM=l>k ? k : l;
	for( let m=-maxM; m<=maxM; m++ ){
	    const val=integral.simpson((x)=> specialFunc.asociatedLegendre(m, l, x)*specialFunc.asociatedLegendre(m, k, x), -1, 1);
	    const true_val= orthogonalVal(m, l, k);
            if( abs(val-true_val)>THRESHOLD ){
               output.math(`\\int^1_{-1} P^{${m}}_{${l}}(x) P^{${m}}_{${k}}(x) dx =`, val, '\\hspace{5mm} true =', true_val);
	    }
	}
    }
}

function orthogonalVal(m, l, k){
    if( l!==k ) return 0;

    let val=2/(2*l+1);
    for( let i=1; i<=l+m; i++ ) val*=i;
    for( let i=1; i<=l-m; i++ ) val/=i;
    
    return val;
}

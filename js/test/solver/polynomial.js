const coffs=[ 1, 5, 4, 3, 5, 1 ];

const ans=solver.polynomial.bastow(coffs);
for( let i=0; i<ans.length; i++ ){
    output.math(`x_{${i}}=`, ans[i]);
}

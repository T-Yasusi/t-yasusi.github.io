const A2=new Matrix( [[ 3, 1 ], [ 2, 2]] );
const A3=new Matrix( [[ 1, 0, -1 ], [ 1, 2, 1], [ 2, 2, 3 ]] );

const A4=new Matrix( [[ 3, 5, 4, 2 ],
                      [ 2, 1, 5, 0 ],
                      [ 0, 1, 1, 0 ],
                      [ 3, 3, 3, 3 ] ] );

const A5=new Matrix( [[ 3, 5, 4, 2, 3 ],
                      [ 2, 1, 5, 0, 5 ],
                      [ 0, 1, 1, 0, 6 ],
                      [ 3, 3, 3, 3, 7 ],
		      [ 1, 5, 10,2, 3 ]] );

printEign(A5);

function printEign(A){
    const [ eign, P ]=linearAlgebra.eign.frameBastow(A);
    output.math('A=', A, 'P=', P);
    const rev_P=linearAlgebra.reverseBySweep(P);

    output.math('P^{-1}*A*P=', rev_P*A*P);
}

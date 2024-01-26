const mat=new Matrix( [ [ 1, 2, 3 ], [3, 2, 1 ], [1, 1, 1] ] );
const rev_mat=linearAlgebra.reverseBySweep(mat);

output.log(mat*rev_mat);

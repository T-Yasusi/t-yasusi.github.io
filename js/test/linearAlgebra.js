const mat = new Matrix(
    [ [ 1, 2, 3 ],
      [ 3, 2, 1 ],
      [ 1, 1, 1 ] ] );

// const mat = new Matrix(
//     [ [ 1, 2, 1 ],
//       [ 2, 1, 0 ],
//       [ 1, 1, 2 ] ] );

output.log('Matrix');
output.log(mat);

output.log('det(mat)', linearAlgebra.det(mat));

const rev=linearAlgebra.reverseBySweep(mat);
output.log('Reverse Matrix');
output.log(rev);

output.log('Check');
output.log(mat*rev);

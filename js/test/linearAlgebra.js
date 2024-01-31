const mat = new Matrix(
    [ [  1,  1, -1 ],
      [ -2, -1, 1 ],
      [ -1, -2, 1 ] ] );

output.log('Matrix');
output.log(mat);

output.log('det(mat)', linearAlgebra.det(mat));

const rev=linearAlgebra.reverseBySweep(mat);
output.log('Reverse Matrix');
output.log(rev);

output.log('Check');
output.log(mat*rev);

console.log('LR decompose by rightLooking');
const [ L1, R1 ]=linearAlgebra.LU.rightLooking(mat);
console.log('L matrix');
output.log(L1);
console.log('R matrix');
output.log(R1);
console.log('check');
output.log(L1*R1);

console.log('LR decompose by leftLooking');
const [ L2, R2 ]=linearAlgebra.LU.leftLooking(mat);
console.log('L matrix');
output.log(L2);
console.log('R matrix');
output.log(R2);
console.log('check');
output.log(L2*R2);

console.log('LR decompose by crout');
const [ L3, R3 ]=linearAlgebra.LU.crout(mat);
console.log('L matrix');
output.log(L3);
console.log('R matrix');
output.log(R3);
console.log('check');
output.log(L3*R3);

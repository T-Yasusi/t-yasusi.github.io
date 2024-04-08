const mat=new Matrix( [ 3, 5, 4, 2 ],
		       [ 2, 1, 5, 0 ],
		       [ 0, 1, 1, 0 ],
		       [ 3, 3, 3, 3 ]  );

output.math('det(A)=', linearAlgebra.det(mat));

const rev_mat=linearAlgebra.reverseBySweep(mat);

output.math('A^{-1}=', rev_mat);
output.math('check=', mat*rev_mat);

output.log('>>>>> LU decomposition by left-looking');
const [ L1, U1, P1 ]=linearAlgebra.LU.leftLooking(mat);
output.math('L=', L1, 'U=', U1);
output.math('check', 'P*L*U=', P1*L1*U1);

output.log('>>>>> LU decomposition by right-looking');
const [ L2, U2, P2 ]=linearAlgebra.LU.rightLooking(mat);
output.math('L=', L2, 'U=', U2);
output.math('check', 'P*L*U=', P2*L2*U2);

output.log('>>>>> LU decomposition by crout');
const [ L3, U3, P3 ]=linearAlgebra.LU.crout(mat);
output.math('L=', L3, 'U=', U3);
output.math('check', 'P*L*U=', P3*L3*U3);

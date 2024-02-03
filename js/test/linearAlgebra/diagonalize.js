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

const eigns1=linearAlgebra.eign.frameBastow(A2);
output.math('\\lambda=', eigns1.map(a=> util.toEffNum(a)));

const eigns2=linearAlgebra.eign.frameBastow(A3);
output.math('\\lambda=', eigns2.map(a=> util.toEffNum(a)));

const eigns3=linearAlgebra.eign.frameBastow(A4);
output.math('\\lambda=', eigns3.map(a=> util.toEffNum(a)));

const eigns4=linearAlgebra.eign.frameBastow(A5);
output.math('\\lambda=', eigns4.map(a=> util.toEffNum(a)));


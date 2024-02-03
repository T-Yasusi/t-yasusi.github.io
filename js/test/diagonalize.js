const mat=new Matrix([
    [ 1, 2 ],
    [ 2, 4 ]
]);

const [ vals, vecs ]= linearAlgebra.eign.powerAll(mat);

for( let i=0; i<vals.length; i++ ){
    output.math(`\\lambda =`, vals[i]);
    output.math(`v =`, vecs[i]);
    output.math('A*v =', mat*vecs[i]);
    output.math('\\lambda*v =', vals[i]*vecs[i]);
}

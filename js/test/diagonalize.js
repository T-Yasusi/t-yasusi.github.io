const mat=new Matrix([
    [ 3, 1 ],
    [ 2, 2 ]
]);

const [ vals, vecs ]= linearAlgebra.eign.powerAll(mat);

for( let i=0; i<vals.length; i++ ){
    output.log(`Eign Value[{i}] =`, vals[i]);
    output.log(`Eign Vector[{i}] =`, vecs[i]);
    output.log(vecs[i]*mat*vecs[i]);
}

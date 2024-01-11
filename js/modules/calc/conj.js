export default (x)=>{
    if( typeof(x)==='number' ) return x;
    else if( typeof(x)==='object' && typeof(x.conj)==='function' ) return x.conj();

    throw new Error('!!! conj invaild !!! undefined calculation');
}

export default x=>{
    if( typeof(x)==='number' ) return Math.abs(x);
    if( typeof(x.abs)==='function' ) return x.abs();
}


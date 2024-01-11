export default x=>{
    if( typeof(x)==='number' ) return -1.0*x;
    else if( typeof(x)==='object' && typeof(x.minus)==='function' ) return x.minus();

    throw new Error('!!! minus is invaild argument !!! '+typeof(x));
}

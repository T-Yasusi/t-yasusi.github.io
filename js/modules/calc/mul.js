const mul=(a, b=void 0)=>{
    if( typeof(a)==='number' && typeof(b)==='undefined' ) return a;
    else if( typeof(a)==='number' && typeof(b)==='number' ) return a*b;
    else if( typeof(a)==='object' && typeof(a.mul)==='function' ) return a.mul(b);
    else if( typeof(b)==='object' && typeof(b.mul)==='function' ) return b.mul(a);

    throw new Error('!!! mul invaild !!! undefined calculation');
}

export default (...args)=>{
    return args.reduce((sum, a)=> mul(sum, a), 1);
}



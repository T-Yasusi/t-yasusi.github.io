const add=(a, b)=>{
    if( typeof(a)==='number' && typeof(b)==='undefined' ) return a;
    else if( typeof(a)==='number' && typeof(b)==='number' ) return a+b;
    else if( typeof(a)==='object' && typeof(a.add)==='function' ) return a.add(b);
    else if( typeof(b)==='object' && typeof(b.add)==='function' ) return b.add(a);
    
    throw new Error('!!! add invaild !!! undefined calculation');
}

export default (...args)=>{
    if( args.length===1 ) return args[0];
    else return args.reduce((sum, a)=> add(sum, a));
}


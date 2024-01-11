import add from './add.js'

const sub=(a, b=void 0)=>{
    if( typeof(a)==='number' && typeof(b)==='undefined' ) return a;
    else if( typeof(a)==='number' && typeof(b)==='number' ) return a-b;
    else if( typeof(a)==='object' && typeof(a.sub)==='function' ) return a.sub(b);
    else if( typeof(b)==='object' && typeof(b.minus)==='function' ) return add(a, b.minus());

    throw new Error('!!! sub invaild !!! undefined calculation');
}

export default (...args)=>{
    return args.reduce((sum, a)=> sub(sum, a));
}

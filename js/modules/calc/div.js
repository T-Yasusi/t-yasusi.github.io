import mul from './mul.js';

export default (a, b=void 0)=>{
    if( typeof(a)==='number' && typeof(b)==='undefined' ) return a;
    else if( typeof(a)==='number' && typeof(b)==='number' ) return a/b;
    else if( typeof(a)==='object' && typeof(a.div)==='function' ) return a.div(b);
    else if( typeof(b)==='object' && typeof(b.reverse)==='function' ) return mul(a, b.reverse());

    throw new Error('!!! div invaild !!! undefined calculation '+typeof(a)+' '+typeof(b));
}

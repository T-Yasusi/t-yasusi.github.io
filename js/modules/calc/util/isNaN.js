import Complex from '../class/Complex.js'

export default x=>{
    if( typeof(x)==='number' ) return Number.isNaN(x);
    if( x instanceof Complex ) return (Number.isNaN(x.re) || Number.isNaN(x.im));
    
    return false;
}

import Complex from '../class/Complex.js'

export default x=>{
    if( typeof(x)==='number' ) return true;
    if( x instanceof Complex ) return true;

    return false;
}

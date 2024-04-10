import getVal from './getVal.js'

let buffer;

export default (mean, err)=>{
    if( typeof buffer ==='number' ){
	const result=err*buffer+mean;
	buffer=void 0;
	return result;
    }
    const x=getVal(0, 1), y=getVal(0, 1);
    buffer=Math.sqrt(-2*Math.log(x))*Math.cos(2*Math.PI*y);
    return err*Math.sqrt(-2*Math.log(x))*Math.sin(2*Math.PI*y)+mean;
}

export default (num, len=2)=>{
    if( Math.abs(num)<10e-8 ){
//	console.log(num, '0');
	return '0';
    }
    const log10=Math.floor(Math.log10(Math.abs(num)));
    const base=Math.pow(10, log10-len);
    // console.log(log10, base);
    // console.log('result', Math.round(num/base)*base);
    return (Math.round(num/base)*base).toFixed(len);
}

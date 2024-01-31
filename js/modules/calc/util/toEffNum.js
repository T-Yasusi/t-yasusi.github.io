export default (num, len=2)=>{
    if( typeof num==='number' ){
	if( Math.abs(num)<10e-8 ) '0';
	const log10=Math.floor(Math.log10(Math.abs(num)));
	const base=Math.pow(10, log10-len);
	return (Math.round(num/base)*base).toFixed(len);
    }

    return num.toString();
}


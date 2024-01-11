export default (n)=>{
    if( Number.isInteger(n) ){
	if( n>0 ){
	    let val=1;
	    for( let i=2; i<=n; i++ ) val*=i;
	    return val;
	}
	else if( n===0 ) return 1;
	else throw new Error(`!!! factorial should be n>=0 !!!`);
    }
    else throw new Error(`!!! factorial not supported type ${typeof(n)} !!!`);
}

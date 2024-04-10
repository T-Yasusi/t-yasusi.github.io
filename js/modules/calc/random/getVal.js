let index=0;
const buffer=new BigUint64Array(65,536/BigUint64Array.BYTES_PER_ELEMENT);
crypto.getRandomValues(buffer);

const BIGUINT_MAX=18446744073709551615;

export default (min=-1, max=1)=>{
    const result=buffer[index];
    index++;
    if( index>buffer.length ){
        crypto.getRandomValues(buffer);
        index=0;
        }
    return 2*(max-min)*(Number(result)/BIGUINT_MAX-0.5);
}

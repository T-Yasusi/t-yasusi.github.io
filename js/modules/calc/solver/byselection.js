import abs from '../abs.js'

export default (func, x0, x1, thre=1.0e-8)=>{
    let y0=func(x0), y1=func(x1);
    if( y0*y1>0 ) throw new Error('!!! Byselection same sign !!!');

    while( abs(x0-x1)>thre ){
	const x_c=0.5*(x0+x1);
	const y_c=func(x_c);
	if( y_c*y0<0 ) x1=x_c;
	else x0=x_c;
    }
    return 0.5*(x0+x1);
}

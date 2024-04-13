export default (data_x, data_y, par, func)=>{
    let chi2=0;
    for( let i=0; i<data_x.length; i++ ){
        if( Math.abs(data_y[i])>10e-8 ){
            chi2 += Math.pow((data_y[i]-func(data_x[i], ...par)), 2)/data_y[i];
        }
    }
    return chi2;
}

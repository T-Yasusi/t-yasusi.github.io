const MAX_LOOP=10000;

export default (data_x, data_y, par, func, threshold, log_level)=>{
//    console.log('===== Fit Simplex Method START ==================');
    const ndf=data_x.length-par.length;
    let chi2=calcChi2(data_x, data_y, par, func);
    const simplex=[];
    simplex.push({ 'parameter': [...par], 'chi2': calcChi2(data_x, data_y, par, func) });
    for( let i=0; i<par.length; i++ ){
	par[i]=2*par[i];
	simplex.push({ 'parameter': [...par], 'chi2': calcChi2(data_x, data_y, par, func) });
    }
    simplex.sort((a,b)=> a.chi2<b.chi2 ? -1: 1);
    
    let counter=0;
    while( Math.abs(simplex[0].chi2-simplex[simplex.length-1].chi2)/(Math.abs(simplex[0].chi2)+Math.abs(simplex[simplex.length-1].chi2))>threshold){
//	console.log('delta =', Math.abs(simplex[0].chi2-simplex[simplex.length-1].chi2)/(Math.abs(simplex[0].chi2)+Math.abs(simplex[simplex.length-1].chi2)));
//	console.log('START');
//	consoleOut(simplex);
	const g_par=new Array(simplex[0].parameter.length).fill(0);
	for( let i=0; i<simplex.length-1; i++ ) for( let j=0; j<simplex[0].parameter.length; j++ ) g_par[j]+=simplex[i].parameter[j];
	for( let j=0; j<simplex[0].parameter.length; j++ )  g_par[j]/=simplex.length-1;

	const r_par=new Array(simplex[0].parameter.length).fill(0);
	for( let j=0; j<simplex[0].parameter.length; j++ ) r_par[j]=2*g_par[j]-simplex[simplex.length-1].parameter[j];
	const r_point={ 'parameter': r_par, 'chi2': calcChi2(data_x, data_y, r_par, func) };
//	console.log('Refection Point :', r_point);
	if( simplex[0].chi2>r_point.chi2 ){
	    const e_par=new Array(simplex[0].parameter.length).fill(0);
	    for( let j=0; j<simplex[0].parameter.length; j++ ) e_par[j]=2*r_par[j]-g_par[j];
	    const e_point={ 'parameter': e_par, 'chi2': calcChi2(data_x, data_y, e_par, func) };
	    if( e_point.chi2<r_point.chi2 ){
		simplex[simplex.length-1]=e_point;
//		console.log('Expnad');
	    }
	    else{
		simplex[simplex.length-1]=r_point;
		console.log('Refrection 0');
	    }
	}
	else if( simplex[0].chi2<r_point.chi2 && r_point.chi2<simplex[simplex.length-2].chi2 ){
	    simplex[simplex.length-1]=r_point;
//	    console.log('Refrection 1');
	}
	else{
	    const c_par=new Array(simplex[0].parameter.length).fill(0);
	    for( let j=0; j<simplex[0].parameter.length; j++ ) c_par[j]=0.5*simplex[simplex.length-1].parameter[j]+0.5*g_par[j];
	    const c_point={ 'parameter': c_par, 'chi2': calcChi2(data_x, data_y, c_par, func) };
	    if( c_point.chi2<simplex[simplex.length-1].chi2 ){
		simplex[simplex.length-1]=c_point;
//		console.log('Reduced');
	    }
	    else{
		for( let i=1; i<simplex.length; i++ ){
		    for( let j=0; j<simplex[0].parameter.length; j++ ){
			simplex[i].parameter[j]=0.5*(simplex[0].parameter[j]+simplex[i].parameter[j]);
		    }
		    simplex[i].chi2=calcChi2(data_x, data_y, simplex[i].parameter, func);
		}
//		console.log('Shirnk');
	    }
	}
	simplex.sort((a,b)=> a.chi2<b.chi2 ? -1: 1);
//	consoleOut(simplex);
	counter++;
	if( counter>MAX_LOOP ){
	    console.log(`Iteration over ${MAX_LOOP}`);
	    break;
	}
    }
    
    // console.log('===== Fit Simplex Method sucessfully FINISH =====');
    // console.log('Iteration :', counter);
    // console.log('delta =', Math.abs(simplex[0].chi2-simplex[simplex.length-1].chi2)/(Math.abs(simplex[0].chi2)+Math.abs(simplex[simplex.length-1].chi2)));
    // console.log(`> chi2/NDF=${simplex[0].chi2}/${ndf}=${simplex[0].chi2/ndf}`);
    const result={ chi2: simplex[0].chi2, 'ndf': ndf, parameter: simplex[0].parameter };
    return result;
}

function consoleOut(simplex){
    for( let i=0; i<simplex.length; i++ ){
	let str='[ ';
	for( let j=0; j<simplex[i].parameter.length; j++ ) str+=simplex[i].parameter[j]+', ';
	str=str.slice(0, -2)+' ]';
	console.log('chi2 ', simplex[i].chi2, '\t', str);
    }    
}

function calcChi2(data_x, data_y, par, func){
    let chi2=0;
    for( let i=0; i<data_x.length; i++ ){
	if( Math.abs(data_y[i])>10e-8 ){
	    chi2 += Math.pow((data_y[i]-func(data_x[i], ...par)), 2)/data_y[i];
	}
    }
    return chi2;
}

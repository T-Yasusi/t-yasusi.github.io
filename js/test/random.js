// Drawing Hist(SVG)xs
const N=10000;
const GAUSS_MEAN=3;
const GAUSS_SIGMA=3;
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const hist=svgTop.makeHist(-10, 10, 100);

const intervalID=setInterval(()=>{
    for( let i=0; i<N; i++ ){
//	hist.fill(random.getVal(0, 1));
	hist.fill(random.gaussian(GAUSS_MEAN, GAUSS_SIGMA));
    }
    hist.draw_wErrBar();

    const par=[ hist.ymax, GAUSS_MEAN, GAUSS_SIGMA ];
    const gaussian=(x, A, mean, sigma)=>{ return A*exp(-pow(x-mean, 2)/pow(2*sigma, 2)) };
    const fit_result=fit.simplex(hist.array_x, hist.array_y, par, gaussian);
//    console.log(fit_result);
    hist.drawFunc(x=> gaussian(x, ...fit_result.parameter)).setAttribute({ 'stroke-width': 2, 'stroke': 'red' });
}, 1000);

modalWrapper.addEventListener('click', ()=>{
    clearInterval(intervalID);
    modalWrapper.style.display='none';
});

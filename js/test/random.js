// Drawing Hist(SVG)xs
const N=10000;
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
	hist.fill(random.gaussian(3, 3));
    }
    hist.draw_wErrBar();
}, 1000);
    
modalWrapper.addEventListener('click', ()=>{
    clearInterval(intervalID);
    modalWrapper.style.display='none';
});

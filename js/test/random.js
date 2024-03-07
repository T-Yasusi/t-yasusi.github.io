// Drawing Hist(SVG)xs
const N=10000;
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const hist=svgTop.makeHist(0, 1, 100);

const intervalID=setInterval(()=>{
    for( let i=0; i<N; i++ ){
	hist.fill(Math.random());
    }
    hist.draw_wErrBar();
}, 1000);
    
modalWrapper.addEventListener('click', ()=>{
    clearInterval(intervalID);
    modalWrapper.style.display='none';
});

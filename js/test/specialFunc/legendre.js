const n=10;
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const graph=svgTop.makeGraph(-1, 1, -1, 1);

for( let i=0; i<n; i++ ){
//    console.log(hslToRGB(i*360, 50, 50));
    graph.drawFunc(x=> specialFunc.legendre(i, x)).setAttribute({
	'stroke-width': 2,
	'stroke': hslToRGB(i*360/n, 100, 50)
    });
}
modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });


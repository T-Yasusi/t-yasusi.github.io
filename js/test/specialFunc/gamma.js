const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const graph=svgTop.makeGraph(-5, 5, -25, 25);

modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });

graph.drawFunc(x=> specialFunc.gamma(x), 10000).setAttribute({
    'stroke-width': 2,
    'stroke': 'red'
});

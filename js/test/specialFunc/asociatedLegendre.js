const l=1;
const n=2*l+1;
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const max=getMax(l);
const graph=svgTop.makeGraph(-1, 1, -max, max);

//draw(0, l);
for( let m=-l; m<=l; m++ ){
    // for( let m=0; m<=l; m++ ){
    draw(m, l);
}

function draw(m, l){
    graph.drawFunc(x=> specialFunc.asociatedLegendre(m, l, x)).setAttribute({
	'stroke-width': 2,
	'stroke': hslToRGB(m*360/n, 100, 50)
    });
}

modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });

function getMax(l){
    let max=0;
    for( let m=-l; m<=l; m++ ){
	let temp=0;
	for( let x=-1; x<=1.0; x+=0.01 ){
	    const val=specialFunc.asociatedLegendre(m, l, x);
	    if( temp<val ) temp=val;
	}
	if( temp>max ) max=temp;
    }
    return max;
}



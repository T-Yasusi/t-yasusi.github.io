const intervalTime=1; // 1000ms=1s
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const graph=svgTop.makeGraph();

graph.xmin=-1.0;
graph.xmax= 1.0;
graph.ymin=-1.0;
graph.ymax= 1.0;

graph.drawCircle(0, 0, 1);
graph.drawLabel();
const text=svgTop.makeText(0.25*svgTop.width, 0);
text.down();

let N=0, hit=0;
const intervalID=setInterval(()=>{
    N++;
    const x=2.0*(Math.random()-0.5), y=2.0*(Math.random()-0.5);
    const point=graph.drawCircle(x, y, 0.005);
    point.setAttribute({'stroke-width': 0});
    if( x**2+y**2<=1.0 ){
	hit++;
	point.setAttribute({'fill': 'red'});
    }
    else{
	point.setAttribute({'fill': 'blue'});
    }
    text.text=`N=${N} hit=${hit} pi=${4*hit/N}`;
}, 100);

modalWrapper.addEventListener('click', ()=>{
    clearInterval(intervalID);
    modalWrapper.style.display='none';
});

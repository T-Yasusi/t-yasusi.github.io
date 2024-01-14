const n=2;
const func=x=>{ return x*x-2; };
let x0=0, x1=n;
let y0=func(x0), y1=func(x1);
let counter=0;

// Drawing Graph(SVG)
const intervalTime=1000; // 1000ms=1s
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';
const svgTop=svg.setTop('#modal0');
const graph=svgTop.makeGraph();
const funcLine=graph.drawFunc(func, 0, n);
const line_base=graph.drawLine(graph.xmin, 0, graph.xmax, 0);
line_base.setAttribute({'stroke-width': 0.5, 'stroke': 'black'});
const line_ans=graph.drawLine(Math.sqrt(n), graph.ymin, Math.sqrt(n), graph.ymax);
const line0=graph.drawLine(x0, graph.ymin, x0, graph.ymax);
const line1=graph.drawLine(x1, graph.ymin, x1, graph.ymax);

const intervalID=setInterval(()=>{
    counter++;
    if( y0*y1>0 ) throw new Error('!!! Byselection same sign !!!');
    const x_c=0.5*(x0+x1);
    const y_c=func(x_c);
    if( y_c*y0<0 ) x1=x_c;
    else x0=x_c;    
    if( Math.abs(x0-x1)<1.0e-8 ) clearInterval(intervalID);
    output.log('Iteration =', counter, ' f(', x_c, ') =', y_c);

    line0.svgX1=graph.svgX(x0);
    line0.svgX2=graph.svgX(x0);
    line1.svgX1=graph.svgX(x1);
    line1.svgX2=graph.svgX(x1);
}, intervalTime);

modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });
//modalWrapper.style.display='none'; // erase display

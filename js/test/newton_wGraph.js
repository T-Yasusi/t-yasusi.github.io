// Setting about equation to solve
const n=2;
const func=(x)=>{ return x*x-n; };
let x0=n;
let x1=x0-func(x0)/diff.central(func, x0);
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
const line0=graph.drawLine(graph.xmin, 0, graph.xmax, 0);
line0.setAttribute({'stroke-width': 0.5, 'stroke': 'blackx'});
const line_ans=graph.drawLine(Math.sqrt(n), graph.ymin, Math.sqrt(n), graph.ymax);
const line=graph.drawLine(x1, graph.ymin, x1, graph.ymax);
let a=diff.central(func, x0);
let b=func(x0)-a*x0;
const line_df=graph.drawLine((graph.ymin-b)/a, graph.ymin, (graph.ymax-b)/a, graph.ymax);

// START Calculation
const intervalID=setInterval(()=>{
    counter++;
    x0=x1;
    x1=x0-func(x0)/diff.central(func, x0);
    output.log('Iteration =', counter, ' x=', x1, 'dx =', Math.abs(x0-x1));
    if( Math.abs(x0-x1)<1.0e-8  ) clearInterval(intervalID);
    line.svgX1=graph.svgX(x1);
    line.svgX2=graph.svgX(x1);

    a=diff.central(func, x0);
    b=func(x0)-a*x0;
    line_df.svgX1=graph.svgX((graph.ymin-b)/a);
    line_df.svgY1=graph.svgY(graph.ymin);
    line_df.svgX2=graph.svgX((graph.ymax-b)/a);
    line_df.svgY2=graph.svgY(graph.ymax);
}, intervalTime);
output.log('x =', x1, '  calc =', Math.sqrt(n));

modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });

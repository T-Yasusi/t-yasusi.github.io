const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const graph=svgTop.makeGraph(-1, 1, -1, 1);

for( let i=0; i<10; i++ ){
    graph.drawFunc(x=> specialFunc.legendre(i, x)).setAttribute({
	'stroke-width': 2,
	'stroke': hslToRGB(i*360/10, 1, 1)
    });
}
modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });

function hslToRGB(h, s, l){
    const rgbToColorCode=(r, g, b)=> '#'+('00'+parseInt(255*r).toString(16)).slice(-2)+('00'+parseInt(255*g).toString(16)).slice(-2)+('00'+parseInt(255*b).toString(16)).slice(-2);
    
    const max=l+s*(1-Math.abs(2*l-1))/2;
    const min=l-s*(1-Math.abs(2*l-1))/2;

    console.log('h =', h, 's=', s, 'l=', l, 'min=', min, 'max=', max);
    
    if( max===min ) return rgbToColorCode(max, max, max);
    else if( 0  <=h && h<60  ) return rgbToColorCode(max, min+(max-min)*h/60, min);
    else if( 60 <=h && h<120 ) return rgbToColorCode(min+(max-min)*(120-h)/60, max, min);
    else if( 120<=h && h<180 ) return rgbToColorCode(min, max, min+(max-min)*(h-120)/60);
    else if( 180<=h && h<240 ) return rgbToColorCode(min, min+(max-min)*(240-h)/60, max);
    else if( 240<=h && h<300 ) return rgbToColorCode(min+(max-min)*(h-240)/60, min, max);
    else if( 300<=h && h<360 ) return rgbToColorCode(max, min, min+(max-min)*(360-h)/60);
    else{
	console.error('!!! Invaild hsl parameters !!!');
	console.error('    h =', h, 's =', s, 'l =', l);
    }
}

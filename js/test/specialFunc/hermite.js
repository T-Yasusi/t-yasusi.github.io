const n=10;
const modalWrapper=document.getElementById('modal-wrapper0');
const modal=document.getElementById('modal0');
modalWrapper.style.display='block';
modal.style.width=0.75*modalWrapper.clientWidth+'px';
modal.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const svgTop=svg.setTop('#modal0');
const graph=svgTop.makeGraph(-5, 5, -0.8, 0.8);

for( let i=0; i<n; i++ ){
    graph.drawFunc(x=> exp(-x*x)*specialFunc.hermite(i, x)/(sqrt(factorial(i)*pow(2, i)*sqrt(Math.PI)))).setAttribute({
	'stroke-width': 2,
	'stroke': hslToRGB(i*360/n, 100, 50)
    });
}
modalWrapper.addEventListener('click', ()=>{ modalWrapper.style.display='none'; });

function hslToRGB(h, s, l){
    // HSL値を0から1の範囲に正規化
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if(s === 0){
        r = g = b = l; // a grayscale
    }else{
        const hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}




import createSVG from './createSVG.js'
import SVGGroup from './class/SVGGroup.js'

export default selector=>{
    const parent=document.querySelector(selector);
    while( parent.firstChild ) parent.removeChild(parent.firstChild);
    
    const [ width, height ] = [ parent.clientWidth, parent.clientHeight ];
    const svg=createSVG('svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
    parent.appendChild(svg);
    const top=new SVGGroup(parent, svg, 0, 0, width, height);
    return top;
}


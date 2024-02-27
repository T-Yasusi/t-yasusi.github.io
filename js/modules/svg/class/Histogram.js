import createSVG from '../createSVG.js'
import SVGGroup from './SVGGroup.js'

import constructor from './Histogram/constructor.js'
import fill from './Histogram/fill.js'
import drawLabelX from './util/drawLabelX.js'
import drawLabelY from './util/drawLabelY.js'


export default class Histogram{
    constructor(group, xmin, xmax, N){ constructor(this, group, xmin, xmax, N); }

    get xmin(){ return this._bins[0]; }
    get xmax(){ return this._bins[this._values.length]; }
    get ymin(){ return 0; }
    get ymax(){ const a=Math.max(...this._values); return 1.1*(a+Math.sqrt(a)); }
    svgX(x){ return this._display.x0+(this._display.width/(this.xmax-this.xmin))*(x-this.xmin); }
    svgY(y){ return this._display.y0+this._display.height*(1.0-(y-this.ymin)/(this.ymax-this.ymin)); }

    drawLabelX(N=5){ drawLabelX(this, N) }
    drawLabelY(N=5){ drawLabelY(this, N) }

    get entries(){ return this._overflow+this._underflow+this._values.reduce((sum, a)=> sum+a); }
    consoleOut(){
	console.log('underflow =', this._underflow);
	for( let i=0; i<this._values.length; i++ ){
	    console.log('i =', i, ' x =', 0.5*(this._bins[i]+this._bins[i+1]), ' y =', this._values[i]);
	}
	console.log('overflow =', this._overflow);
    }
    
    draw(attr={ fill: 'none', strokeWidth: 1.5, stroke: 'black' }){
	this.consoleOut();
	const xmin=this._bins[0], xmax=this._bins[this._values.length];

	if( this._bars!=null ) while( this._bars.length>0 ) this._display._elem.removeChild(this._bars.pop()._elem);

	if( this._bars==null || this._bars.length===0 ){
	    this._bars=[];
	    for( let i=0; i<this._values.length; i++ ){
		const rect=this._display.makeRect(this._bins[i], 1.0-this._values[i]/this.ymax, this._bins[i+1], 1.0);
		rect.setAttribute(attr);    
		this._bars.push(rect);
	    }
	}
	this.drawLabelX();
	this.drawLabelY();
    }

    fill(val){ fill(this, val); }
}

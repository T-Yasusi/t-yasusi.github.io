import createSVG from '../createSVG.js'
import SVGGroup from './SVGGroup.js'

export default class Graph{
    constructor(group){
	this._group=group;

	const [ x0, y0, width, height ] = [ 'x0', 'y0', 'width', 'height' ].map(a=> group[a]);
	this._display=new SVGGroup(group, createSVG('g'), x0+0.1*width, y0+0.1*height, 0.8*width, 0.8*height);
	this._axisX=new SVGGroup(group, createSVG('g'), x0+0.1*width, y0+0.9*height, 0.8*width, 0.1*height);
	this._axisY=new SVGGroup(group, createSVG('g'), x0+0.1*width, y0+0.1*height, 0.1*width, 0.8*height);
	const disp=this._display.makeRect(0, 0, 1.0, 1.0);
	disp.setAttribute({ 'fill': 'none', 'stroke': 'black' });
	this._xmax=1;
	this._xmin=0;
	this._ymax=1;
	this._ymin=0;
    }

    get xmax(){ return this._xmax; }
    get xmin(){ return this._xmin; }
    get ymax(){ return this._ymax; }
    get ymin(){ return this._ymin; }
    svgX(x){ return this._display.x0+(this._display.width/(this._xmax-this._xmin))*(x-this._xmin); }
    svgY(y){ return this._display.y0+this._display.height*(1.0-(y-this._ymin)/(this._ymax-this._ymin)); } 
    
    drawLine(x1, y1, x2, y2){
	const line=this._display.makeLine(this._display.width*(x1-this.xmin)/(this.xmax-this.xmin), this._display.height*(1.0-(y1-this.ymin)/(this.ymax-this.ymin)),
					  this._display.width*(x2-this.xmin)/(this.xmax-this.xmin), this._display.height*(1.0-(y2-this.ymin)/(this.ymax-this.ymin)));
	line.setAttribute({'stroke-width': 2, 'stroke': 'red'});
	return line;
    }
    drawFunc(func, xmin=0, xmax=1, n=100){
	this._xmin=xmin;
	this._xmax=xmax;
	const x_points=[], y_points=[];
	const dx=(xmax-xmin)/n;
	for( let x=xmin; x<=xmax; x+=dx){
	    x_points.push(x);
	    y_points.push(func(x));
	}
	this._ymax=Math.max(...y_points);
	this._ymin=Math.min(...y_points);
	const scaleX=1.0/(this._xmax-this._xmin);
	const scaleY=1.0/(this._ymax-this._ymin);
	for( let i=0; i<x_points.length; i++ ){
	    x_points[i]=scaleX*(x_points[i]-this._xmin);
	    y_points[i]=scaleY*(y_points[i]-this._ymin);
	}
	const path=this._display.makePath(x_points, y_points);
	this.drawLabelX();
	this.drawLabelY();
	return path;
    }
    drawLabelX(N=5){
	const log10=Math.floor(Math.log10(this.xmax-this.xmin));
	const base =Math.pow(10, log10)*0.1;
	const start=Math.ceil(this.xmin/(base))*base;
	const end=Math.floor(this.xmax/(base))*base;
	const dx=(end-start)/N;
	for( let x=start; x<this.xmax; x+=dx){
	    const text=this._axisX.makeText(this.svgX(x), this._axisX.y0, (Math.round(x/base)*base).toFixed(log10<=0 ? Math.abs(log10)+1 : 0));
	    text.center().down();
	}
    }

    drawLabelY(N=5){
	const log10=Math.floor(Math.log10(this.ymax-this.ymin));
	const base= Math.pow(10, log10)*0.1;
	const start=Math.ceil(this.ymin/(base))*base;
	const end=Math.floor(this.ymax/(base))*base;
	console.log(start, end, this.ymax, this.ymin, N, log10, this.ymax-this.ymin, Math.log10( this.ymax-this.ymin));
	const dy=(end-start)/N;
	for( let y=start; y<this.ymax; y+=dy){
	    const text=this._axisY.makeText(this._axisY.x0, this.svgY(y), (Math.round(y/base)*base).toFixed(log10<=0 ? Math.abs(log10)+1 : 0));
	    text.left().middle();
	}
    }	
}

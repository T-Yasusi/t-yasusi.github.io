import createSVG from '../createSVG.js'
import create from '../create.js'
import Graph from './Graph.js'
import SVGObject from './SVGObject.js'

class SVGGroup {
    constructor(parent, elem, x0, y0, width, height){
	this._parent=parent;
	this._elem=elem;
	if( this._parent._elem!=null && this._parent._elem.appendChild!=null ) this._parent._elem.appendChild(this._elem);

	this._x0    = x0!=null ? x0 : parent.x0;
	this._y0    = y0!=null ? y0 : parent.y0;
	this._width = width!=null ? width : parent.width;
	this._height= height!=null ? height : parent.height;
	
	this._groups=[];
	this._elements=[];
    }

    get x0(){ return this._x0; }
    get y0(){ return this._y0; }
    get width(){ return this._width; }
    get height(){ return this._height; }

    makeGraph(){ return new Graph(this, this._elem); }

    makeRect(x0, y0, x1, y1){ return create.rect(this, x0, y0, x1, y1); }
    makePath(x_points, y_points){ return create.path(this, x_points, y_points); }
    makeLine(x1, y1, x2, y2){ return create.line(this, x1, y1, x2, y2); }
    makeText(x, y, text){ return create.text(this, x, y, text); }
    
    makeGroup(){
	const group=new SVGGroup(this, createSVG('g'));
	this._groups.push(group);
	return group;
    }
}

export default SVGGroup;
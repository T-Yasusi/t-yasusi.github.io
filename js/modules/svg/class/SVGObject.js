export default class {
    constructor(parent, elem){
	this._parent;
	this._elem=elem;
    }
    
    setAttribute(params){
//	console.log(params);
	if( typeof(params)==='object' ){
	    for( const [key, val] of Object.entries(params) ){
//		console.log(key, val);
		if( typeof(val)==='number' ){
		    if( Number.isNaN(val)===false ) this._elem.setAttribute(key, val);
		}
		else this._elem.setAttribute(key, val);
	    }
	}
	return this;
    }
}

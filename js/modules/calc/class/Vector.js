import conj from '../conj.js'
import mul from '../mul.js';
import add from '../add.js';
import sqrt from '../sqrt.js'
import Complex from './Complex.js'
import Matrix from './Matrix.js'

import toEffNum from '../util/toEffNum.js'

class Vector extends Array{
//    static get [Symbol.species]() { return Array; };
    constructor (...args){
	if( args.length===1 && typeof(args[0])==='number' ) super(args[0]).fill(0);
	else if( args.length===1 && args[0] instanceof Array && args[0].every(a=> typeof(a)==='number' || a instanceof Complex ) ){
	    super(...args[0]);
	}
	else if( args.every(a=> typeof(a)==='number' || a instanceof Complex ) ) super(...args);
	else new Error('!!! Vector invalid construvtor !!!');
    }
//	console.log('constructor', this);

    get size(){ return this.length; }

    copy(){ return new Vector(this); }
    trans(){
	const transed=new Vector(this);
	for( let i=0; i<this.length; i++ ){ transed[i]=conj(this[i]); }
	return transed;
    }
    abs(){ return sqrt(mul(this, this)); }
    abs2(){ return mul(this, this); }
    unitVector(){
	const norm=this.abs();
	return new Vector(this.map(a=> div(a/norm)));
    }

    add(vec){
	if( (vec instanceof Vector)===false ) throw new Error('!!! vec.add invalid argment !!! '+typeof(vec));
	if( this.size!==vec.size )  throw new Error('!!! vec.add should be same size !!! '+this.size+' '+vec.size);
	const result =new Vector(this.map((a, i)=> add(a, vec[i])));
	return result;
    }
    
    sub(vec){
	if( (vec instanceof Vector)===false ) throw new Error('!!! vec.sub invalid argment !!! '+typeof(vec));
	if( this.size!==vec.size )  throw new Error('!!! vec.sub should be same size !!! '+this.size+' '+vec.size);
	const result =new Vector(this.map((a, i)=> sub(a, vec[i])));
	return result;
    }
    
    mul(vec){
	if( typeof(vec)==='number' || vec instanceof Complex ){
	    const result=new Vector(this);
	    for( let i=0; i<this.length; i++ ) result[i]=mul(vec, this[i]);
	    return result;	    
	}
	else if( vec instanceof Vector ){
	    if( this.length!==vec.length ) throw new Error('!!! Vector.mul not match size '+this.length+' '+vec.length);
	    let result=0;
	    for( let i=0; i<this.length; i++ ){
		result=add(result, mul(conj(this[i]), vec[i]));	
	    }
	    return result;
	}
	else if( vec instanceof Matrix ){
	    if( this.size!==vec.colSize ) throw new Error('!!! Vector.mul not match size '+this.length+' '+vec.colSize);
	    let result=new Vector(vec.rowSize);
	    for( let i=0; i<this.rowSize; i++ ){
		let sum=0;
		for( let k=0; k<this.size; k++ ) sum=add(sum, mul(conj(this[k]), vec[k][i]));
		result[i]=sum;
	    }
	    return result;
	}
	throw new Error('!!! Vector.mul invalid tyep '+typeof(vec));
    }

    toString(){
	let str='[ ';
	for( let i=0; i<this.length; i++ ) str+=(typeof(this[i])==='number' ? toEffNum(this[i]) : this[i])+', ';
	str=str.slice(0, -2)+' ]';
	return str;
    }

    toTex(){
	let str='\\begin{pmatrix}';
	for( let i=0; i<this.length; i++ ) str+=toEffNum(this[i])+'& ';
	str=str.slice(0, -2)+' \\end{pmatrix}';
	return str;
    }
}

export default Vector;

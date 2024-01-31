import conj from '../conj.js'
import mul from '../mul.js';
import add from '../add.js';
import sub from '../sub.js';
import Complex from './Complex.js'
import Vector from './Vector.js'
import toEffNum from '../util/toEffNum.js'

class Matrix extends Array{
    static get [Symbol.species](){ return Array; }
    constructor(...args){
//	console.log('Matrix.constrcutor args=', args);
	if( args.length===1 && args[0] instanceof Array && args[0].every(a=> a instanceof Array) ){
//	    console.log('Matrix.constrcutor AAA');
	    super();
	    for( const a of args[0] ) this.push(new Vector(a));
	}
	else if( args.length===2 && args.every(a=> typeof(a)==='number' ) ){
	    super();
	    for( let i=0; i<args[0]; i++ ) this.push(new Vector(args[1]))

	}
	else throw new Error('!!! Matrix invaild constructor !!! '+typeof(args));
//	console.log(this);
    }

    copy(){ return new Matrix(this); }
    get rowSize(){ return this[0].length; }
    get colSize(){ return this.length; }

    rowVec(i){ return new Vector(this(i)); }
    rowVector(i){ return this.rowVec(i); }
    colVec(i){ return new Vector(this.colSize).map((a, k)=> this[k][i]); }
    colVector(i){ return this.colVec(i); }
    
    setRowVec(i, vec){ this[i]=new Vector(vec); }
    setRowVector(i, vec){ this.setRowVector(i, vec); }
    setColVec(i, vec){ vec.forEach((a, k)=>{ this[k][i]=vec[k]; }) }
    setColVector(i, vec){ this.setColVector(i, vec); }
    
    trans(){
	const result=new Matrix(this.rowSize, this.colSize);
	for( let i=0; i<this.colSize; i++ ) for( let j=0; j<this.rowSize; j++ ) result[j][i]=this[i][j];
	return result;
    }
    
    add(mat){
	if( (mat instanceof Matrix)===false ) throw new Error('!!! Matrix.add invaild argument !!! '+typeof(mat));
	if( this.colSize!==mat.colSize || this.rowSize!==mat.rowSize ) throw new Error('!!! Matrix.add not match size !!!');
	const result=new Matrix(this.colSize, this.rowSize);
	for( let i=0; i<this.colSize; i++ ){
	    for( let j=0; j<this.colSize; j++ ){
		result[i][j]=add(this[i][j], mat[i][j]);
	    }
	}
	return result;
    }
    sub(mat){
	if( (mat instanceof Matrix)===false ) throw new Error('!!! Matrix.sub invaild argument !!! '+typeof(mat));
	if( this.colSize!==mat.colSize || this.rowSize!==mat.rowSize ) throw new Error('!!! Matrix.sub not match size !!!');
	const result=new Matrix(this.colSize, this.rowSize);
	for( let i=0; i<this.colSize; i++ ){
	    for( let j=0; j<this.colSize; j++ ){
		result[i][j]=sub(this[i][j], mat[i][j]);
	    }
	}
	return result;
    }
    
    mul(a){
//	console.log(a);
	if( typeof(a)==='number' || a instanceof Complex){
	    const result=new Matrix(this);
	    for( let i=0; i<this.colSize; i++ ) for( let j=0; j<this.rowSize; j++ ) result[i][j]=mul(a, this[i][j]);
	  
	    return result;
	}
	else if( a instanceof Vector ){
	    if( this.rowSize!==a.size ) throw new Error('!!! Matrix.mul size not mactch'+this.colSize+' '+a.size+' !!!');
	    const result=new Vector(this.colSize);
	    for( let i=0; i<this.colSize; i++ ){
		let sum=0;
		for( let k=0; k<this.rowSize; k++ ) sum=add(sum, mul(this[i][k], a[k]));
		result[i]=sum;
	    }
	    return result;
	}
	else if( a instanceof Matrix ){	
	    if( this.rowSize!==a.colSize ) throw new Error('!!! Matrix.mul size not mactch'+this.colSize+' '+a.rowSize+' !!!');
	    const result=new Matrix(Array(this.colSize).fill(Array(a.rowSize).fill(0)));
	    for( let i=0; i<this.colSize; i++ ){
		for( let j=0; j<this.rowSize; j++ ){
		    let sum=0;
		    for( let k=0; k<this.rowSize; k++ ){
			sum=add(sum, mul(this[i][k], a[k][j]));
		    }
		    result[i][j]=sum;
		}
	    }
	    return result;
	}
	throw new Error('!!! Matrix.mul invarid argument !!! '+typeof(a));
    }

    toString(){ return this.reduce((sum, a)=> sum+'<br>'+a.toString()); }
    toString(){
	let str='<table>'
	for( let i=0; i<this.colSize; i++ ){
	    str+='<tr> <td>[';
	    for( let j=0; j<this.rowSize-1; j++ ) str+='<td>'+toEffNum(this[i][j])+',';
	    str+='<td>'+toEffNum(this[i][this.rowSize-1])+'<td>]</tr>';
	}
	str+='</table>';
	return str;
    }
}

export default Matrix;

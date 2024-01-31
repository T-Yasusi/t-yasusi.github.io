import toEffNum from '../util/toEffNum.js'

class Complex{
    constructor(a, b){
	this.real=a;
	this.imag=b;
    }

    set re(a){ this.real=a; }
    get re(){ return this.real; }
    set im(a){ this.imag=a; }
    get im(){ return this.imag; }

    abs2(){ return this.real*this.real+this.imag*this.imag; }
    abs(){ return Math.sqrt(this.real*this.real+this.imag*this.imag); }
    arg(){ return Math.atan2(this.imag, this.real); }
    minus(){ return new Complex(-this.real, -this.imag); }
    reverse(){
	const r2=this.abs2();
	return new Complex(this.real/r2, -this.imag/r2);
    }
    conj(){ return new Complex(this.real, -this.imag); }
    
    add(a){
	if( typeof(a)==='number' ) return new Complex(this.real+a, this.imag);
	if( (a instanceof Complex)===true ) return new Complex(this.real+a.real, this.imag+a.imag);

	throw new Error(`!!! Complex.add error !!! args=typeof(a)`+typeof(a));
    }
    sub(a){
	if( typeof(a)==='number' ) return new Complex(this.real-a, this.imag);
	if( (a instanceof Complex)===true ) return new Complex(this.real-a.real, this.imag-a.imag);

	throw new Error(`!!! Complex.sub error !!! args=typeof(a)`);
    }
    mul(a){
	if( typeof(a)==='number' ) return new Complex(a*this.real, a*this.imag);
	if( (a instanceof Complex)===true ) return new Complex(this.real*a.real-this.imag*a.imag, this.real*a.imag+this.imag*a.real); 
	
	throw new Error(`!!! Complex.mul error !!! args=typeof(a)`);
    }
    div(a){
	if( typeof(a)==='number' ) return new Complex(this.real/a, this.imag/a);
	if( (a instanceof Complex)===true ) return this.mul(a.reverse());
	
	throw new Error(`!!! Complex.div error !!! args=typeof(a)`);
    }
    
    toString(){
	if( Math.abs(this.real)<=1.0e-8 && Math.abs(this.imag)<=1.0e-8 ) return '0';
	if( Math.abs(this.real)>1.0e-8 && Math.abs(this.imag)<=1.0e-8 ) return ''+toEffNum(this.real);
	if( Math.abs(this.real)<=1.0e-8 && Math.abs(this.imag)>1.0e-8 ) return ''+toEffNum(this.imag)+'*i';

	if( this.imag>1.0e-8  ) return ''+toEffNum(this.real)+'+'+toEffNum(this.imag)+'*i';
	if( this.imag<-1.0e-8 ) return ''+toEffNum(this.real)+toEffNum(this.imag)+'*i';

	throw new Error('!!! Complex.toString !!! Invaild member value');
    }
    toEffNum(){ return this.toString(); }
}

export default Complex;

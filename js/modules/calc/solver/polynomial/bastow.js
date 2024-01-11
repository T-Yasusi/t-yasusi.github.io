import add from '../../add.js'
import sub from '../../sub.js'
import mul from '../../mul.js'
import div from '../../div.js'
import abs from '../../abs.js'
import sqrt from '../../sqrt.js'

const MAX_LOOP=1000;

export default (coffs, thre=1.0e-10)=>{
    const result=[];
    while( coffs.length>3 ){
	const [new_coffs, ans ]=step(coffs, thre);
	coffs=new_coffs;
	result.push(...ans);
    }

    if( coffs.length===2 ){
	result.push(-coffs[1]/coffs[0]);
    }
    else if( coffs.length===3 ){
	const D=sqrt(sub(mul(coffs[1], coffs[1]), mul(4, coffs[2], coffs[0])));
	result.push(div(sub(mul(-1, coffs[1]), D), mul(2, coffs[0])), div(add(mul(-1, coffs[1]), D), mul(2, coffs[0])));

    }
//    console.log(result);
    return result;
}

function step(coffs, thre){
    if( abs(coffs[0], 1)>1.0e-8 ) for( let i=coffs.length-1; i>=0; i-- ) coffs[i]=div(coffs[i], coffs[0]);
    
    let p=1, q=1;
    const b=[ 1, sub(coffs[1], p) ];
    for( let i=2; i<coffs.length; i++ ) b.push(sub(coffs[i], mul(p, b[i-1]), mul(q, b[i-2])));
    // const b=[ 1, coffs[1]-p ];
    // for( let i=2; i<coffs.length; i++ ) b.push(coffs[i]-p*b[i-1]-q*b[i-2]);

    const c=[ 1, sub(b[1], p) ];
    for( let i=2; i<coffs.length; i++ ) c.push(sub(b[i], mul(p, c[i-1]), mul(q, c[i-2])));
    // const c=[ 1, b[1]-p ];
    // for( let i=2; i<coffs.length; i++ ) c.push(b[i]-p*c[i-1]-q*c[i-2]);
    
    let counter=0;
    while( true ){
	counter++;
	// const R=c[c.length-3]*c[c.length-3]-c[c.length-4]*(c[c.length-2]-b[b.length-2]);
	// const dp=(b[b.length-2]*c[c.length-3]-b[b.length-1]*c[c.length-4])/R;
	// const dq=(b[b.length-1]*c[c.length-3]-b[b.length-2]*(c[c.length-2]-b[b.length-2]))/R;
	const R=sub(mul(c[c.length-3], c[c.length-3]), mul(c[c.length-4], sub(c[c.length-2], b[b.length-2])));
	const dp=div(sub(mul(b[b.length-2], c[c.length-3]), mul(b[b.length-1], c[c.length-4])), R);
	const dq=div(sub(mul(b[b.length-1], c[c.length-3]), mul(b[b.length-2], sub(c[c.length-2], b[b.length-2]))), R);
	
	p=add(p, dp);
	q=add(q, dq);

	// b[1]=coffs[1]-p;
	// for( let i=2; i<coffs.length; i++ ) b[i]=coffs[i]-p*b[i-1]-q*b[i-2];	
	b[1]=sub(coffs[1], p);
	for( let i=2; i<coffs.length; i++ ) b[i]=sub(coffs[i], mul(p, b[i-1]), mul(q, b[i-2]));
	
	// c[1]=b[1]-p;
	// for( let i=2; i<coffs.length; i++ ) c[i]=b[i]-p*c[i-1]-q*c[i-2];
	c[1]=sub(b[1], p);
	for( let i=2; i<coffs.length; i++ ) c[i]=sub(b[i], mul(p, c[i-1]), mul(q, c[i-2]));

	if( counter>MAX_LOOP ) throw new Error('!!! solver.bastow loop over '+MAX_LOOP+' !!!');
	if( abs(dp)<thre && abs(dq)<thre ){
	    // console.log(counter, dp, dq);
	    break;
	}
    }
    const D=sqrt(sub(mul(p, p), mul(4, q)));
    const ans=[ div(sub(mul(-1, p), D), 2), div(add(mul(-1, p), D), 2) ]; 
    
    coffs=[];
    for( let i=0; i<b.length-2; i++ ) coffs.push(b[i]);
    // console.log(ans, coffs);
    
    return [ coffs, ans ];
}

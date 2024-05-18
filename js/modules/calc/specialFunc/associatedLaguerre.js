import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'
import minus from '../minus.js'
import laguerre from './laguerre.js'

export default (m, n, x)=>{ // L^m_n(x)
    if( n<0 ) throw new Error('!!! associatedLaguerre not suport n<0 !!!');
    if( m<0 ) throw new Error('!!! associatedLaguerre not suport m<0 !!!');
    if( m>n ){
	console.log('associatedLaguerre m>n  return 0;');
	return 0;
    }
    if( m===0 ) return laguerre(n, x);
    if( m===1 && n===1 ) return -1;
    if( m===1 ){

    }
    
    }
    if(  m===0 && n===0 ) return 1;
    if 
    
    else if{
	let Lm_n2=laguerre(m, x), Lm_n1=laguerre(
    }
    

}

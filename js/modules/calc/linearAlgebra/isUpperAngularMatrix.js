import Matrix from '../class/Matrix.js'
import add from '../add.js'
import sub from '../sub.js'
import mul from '../mul.js'
import div from '../div.js'

import abs from '../abs.js'

const thre=1.0e-6;

export default (mat)=>{
    for( let j=0; j<mat.rowSize; j++ ){
        for( let i=j+1; i<mat.colSize; i++ ){
            if( abs(mat[i][j])>thre ) return false;
        }
    }
}

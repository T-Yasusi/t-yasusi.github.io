import toEffNum from '../../util/toEffNum.js'

export default (mat, effNum=2)=>{
    for( let i=0; i<mat.colSize; i++ ){
        let str='[ ';
        for( let j=0; j<mat.rowSize; j++ ) str+=toEffNum(mat[i][j], effNum)+', ';
        str+=']';
        console.log(str);
    }
}

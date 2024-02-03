import frame from '../frame.js'
import bastow from '../../solver/polynomial/bastow.js'

export default mat=>{
    const coffs=frame(mat);
    return bastow(coffs);
}

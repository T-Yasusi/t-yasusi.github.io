import trapezoid from './integral/trapezoid.js'
import simpson from './integral/simpson.js'
import minusOneToOne from './integral/double_exponential/minusOneToOne.js'
import zeroToInf from './integral/double_exponential/zeroToInf.js'
import minusInfToInf from './integral/double_exponential/minusInfToInf.js'

export default {
    trapezoid: trapezoid, 
    simpson: simpson,
    double_exponential: {
	minusOneToOne: minusOneToOne,
	zeroToInf: zeroToInf,
	minusInfToInf: minusInfToInf,
    },
}

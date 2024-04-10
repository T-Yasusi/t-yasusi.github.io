import bastow from './solver/polynomial/bastow.js'
import dka from './solver/polynomial/dka.js'
import newton from './solver/newton.js'
import byselection from './solver/byselection.js'

import diff from './solver/diff.js'

export default {
    newton: newton,
    byselection: byselection,
    
    polynomial: {
	bastow: bastow,
	dka: dka,
    }
}

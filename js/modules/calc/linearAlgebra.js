import det from './linearAlgebra/det.js'
import reverseBySweep from './linearAlgebra/reverseBySweep.js'
import frame from './linearAlgebra/frame.js'

import power from './linearAlgebra/eign/power.js'
// import powerAll from './linearAlgebra/eign/powerAll.js'
// import householderQR from './linearAlgebra/eign/householderQR.js'
import frameBastow from './linearAlgebra/eign/frameBastow.js'

import rightLooking from './linearAlgebra/LU/rightLooking.js'
import leftLooking from './linearAlgebra/LU/leftLooking.js'
import crout from './linearAlgebra/LU/crout.js'

import gramSchmidt from './linearAlgebra/QR/gramSchmidt.js'
import householder from './linearAlgebra/QR/householder.js'

export default {
    det: det,
    reverseBySweep: reverseBySweep,
    frame: frame,
    eign: {
	power: power,
	frameBastow: frameBastow,
//	powerAll: powerAll,
//	householderQR: householderQR,
    },
    QR: {
	gramSchmidt: gramSchmidt,
	householder: householder,
    },
    LU: {
	rightLooking: rightLooking,
	leftLooking: leftLooking,
	crout: crout,
    }
}


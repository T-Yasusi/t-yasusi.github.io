import simplex from './fit/simplex.js'
// import gradient from './fit/gradient.js'

export default {
    simplex: (data_x, data_y, par, func, threshold=10e-6, log_level=0)=>{ return simplex(data_x, data_y, par, func, log_level); },
//    gradient: (data_x, data_y, par, func, log_level=0)=>{ return gradient(data_x, data_y, par, func, log_level); },
}

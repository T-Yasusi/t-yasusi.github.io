import simplex from './fit/simplex.js'

export default {
    simplex: (data_x, data_y, par, func, log_level=0)=>{ return simplex(data_x, data_y, par, func, log_level); },
}

import colors from 'colors'

export function requestTime(req, res, next){
    req.requestTime = Date.now();
    next();
}

export function collor(req, res, next){
    console.log(colors.bgMagenta.white(`Req.time: ${req.requestTime}`))
    next()
}
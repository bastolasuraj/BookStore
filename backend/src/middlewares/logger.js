const {API_KEY} = require('../config')
exports.logger = (req, res, next) => {
    req.appId = API_KEY
    next()
}

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.JWTSECRET)
    const userId = decodedToken.userId
    if(req.body.userId !== userId) {
        throw 'Invalid user ID'
    } else{
        next()
    }
 } catch{
        res.status(401).json('not authorized')
    }
}
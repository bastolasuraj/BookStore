const {verify} = require("jsonwebtoken")
const {ACCESS_TOKEN} = require("../config")
const {User} = require("../models")
exports.auth = (req, res, next)=>{
    const authorization = req.headers.authorization
    if(!authorization){
        throw new Error("Headers Not Sent")
    }
    const accessToken = authorization.split(" ")[1]
    console.log(accessToken)
    const payload = verify(accessToken,ACCESS_TOKEN)
    if(!payload){
        throw new Error("Unable to verify Access Token")
    }
    if(payload.type!=='accessToken'){
        throw new Error("Token is not accessToken")
    }
    User.findById(payload.userId).then((user)=>{
        if(!user){
            throw new Error("Unauthorized Access")
        }
    })
    next()
}
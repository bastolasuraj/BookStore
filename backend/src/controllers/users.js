const {User} = require("../models")
const {ACCESS_TOKEN, ACCESS_EXPIRY, REFRESH_TOKEN, REFRESH_EXPIRY} = require("../config")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
exports.userList = async (req, res) => {
    const list = await User.find()
    res.status(200).send({
        data: list
    })

}
exports.createUser = async (req, res) => {
    new User(req.body).save().then((newUser) => {
        res.status(301).send({
            message: "User Created Successfully",
            data: newUser
        })
    }).catch((error) => {
        res.status(501).send({
            error: error.message,
            data: null
        })
    })
}
exports.updateUser = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (user) {
        console.log(req.body)
        user = await User.updateOne({_id: req.params.id}, {$set: req.body})
    }
    res.status(301).send({
        message: "Update Successful",
        data: user
    })
}
exports.deleteUser = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (user) {
        user = await User.remove({_id: req.params.id})
    }
    res.status(301).send({
        message: "Deleted User",
        data: user
    })
}
exports.userDetail = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).send({
        message: "User Detail",
        data: user
    })
}
exports.userLogin = async (req, res) => {
    // console.log('hello',req.params.username)
    const user = await User.findOne({username: req.body.username})
    if (user) {
        let accessToken
        let refreshToken
        bcrypt.compare(req.body.password, user.password, (error, matched) => {
            if (error) throw new Error("Password Does not match with the Database")
            if (matched) {
                accessToken = sign({
                        userId: user.id,
                        type: "accessToken"
                    }, ACCESS_TOKEN, {expiresIn: ACCESS_EXPIRY}
                )
                refreshToken = sign({
                        userId: user.id,
                        type: "refreshToken"
                    }, REFRESH_EXPIRY, {expiresIn: REFRESH_EXPIRY}
                )
                res.status(200).send({
                    accessToken:accessToken,
                    refreshToken:refreshToken,
                    accessTokenExp:ACCESS_EXPIRY,
                    refreshTokenExp:REFRESH_EXPIRY,
                    username:user.username,
                    usertype:user.usertype
                })
            }
            else {
                res.status(401).send({
                    status: 401,
                    data: null,
                    message: "Unauthorized Access",
                });
            }
        })
    }
}
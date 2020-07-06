const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {Schema} = mongoose
const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String},
    usertype: {type: String, enum: ['Customer', 'Admin', 'Superadmin'], default:"Customer"}
},{
    timestamps:true
})
UserSchema.pre('save',function (next){
    const user = this
    if(!user.isModified('password'))next()
    bcrypt.hash(user.password,10,function (error,hashed){
        if(error){
            throw new Error("Unable to Hash Password")
        }
        user.password = hashed
        next()
    })
})
module.exports = mongoose.model("User", UserSchema)
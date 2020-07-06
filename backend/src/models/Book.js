const mongoose = require("mongoose")
const {Schema, Types} = mongoose
const BookSchema = new Schema({
    bookName: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true},
    publishedDate: {type: Date},
    publication: {type: String},
    pages: {type: Number},
    cover: {type: String},
    category: {type: String},
    uploadedBy: {type: Types.ObjectId, ref:"User"},
    },{
    timestamps:true
})
module.exports = mongoose.model("Book", BookSchema)
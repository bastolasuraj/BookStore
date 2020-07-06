const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const {APP_PORT,DB_URL} = require("./config")
const {logger} = require("./middlewares")
const app = express()
app.use(cors({origin:"http://localhost:3000"}))
app.use(bodyParser.json())
app.use(logger)
app.get('/',(req,res)=>{
    res.send("Homepage")
})
//Mongoose Connection
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfully")
}).catch(() => {
    console.log("Failed toConnect the Database")
})
require("./routes/users")(app)
require("./routes/books")(app)

app.listen(APP_PORT,()=>{
    console.log(`Application Running on http://localhost:${APP_PORT}`)
})

//server 

var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")



//create app to connect to local host
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

//connect to mongoDB database
mongoose.connect('mongodb://localhost:27017/MoneyList')
var db=mongoose.connection
//check mongodb connection established or not
db.on('error',()=> console.log("Error in connecting to the Database"))
db.once('open',() => console.log("Connected to Database"))

app.post("/add",(req,res)=>{
    var category_select = req.body.category_select
    var amount_input = req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input


    var data={
        "Category":category_select,
        "Amount":amount_input,
        "Info":info,
        "Date":date_input
    }
    //table name is users
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted Successfully")
    })
})

//check connection is established prooperly or not
app.get("/",(req,res)=>{
    //res.send("Successfully connected to port 5000")
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('index.html')
}).listen(5000)

console.log("Listening on port 5000")

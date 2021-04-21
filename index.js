const express = require("express")
const mongoose = require("mongoose")
const userdata = require("./model/userdata")
const url = 'mongodb://localhost/clint'
const Userdata = require("./model/userdata")

const app = express()

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open',function(){
    console.log('connected')
}) 

app.use(express.urlencoded({
    extended:true
}))


app.get('/user',async(req,res) => {
    Userdata.find()      
    .then(result => { 
        console.log(result)
        res.status(200).json({
            newUserdata:result
        }) 
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}) 

app.post('/user',(req,res)=>{
    const user = new Userdata({
        name:req.body.name,
        email:req.body.email,
        consent:req.body.consent
    })

    const ema = req.body.email;
    const u = Userdata.find({email:ema});
    console.log(u.email == ema)

    if(u.email == ema){
        res.send("email already in use")
    }
    else{
        user.save()
        .then(result=>{
            res.send("user information saved")
        })
        .catch(err =>{
        res.send(err)
    })
    }
})


app.delete('/:id',(req,res,next)=>{
    Userdata.remove({_id:req.params.id})
    .then(result=>{
        res.send("deleted")
    })
    .catch(err =>{
        res.send(err)
    })

})

app.post('/event/:id',async(req,res)=>{
    await Userdata.findOneAndUpdate({_id:req.params.id},{consent:req.body.consent},{upsert:true})
    .then(res.send("updated"))
    .catch(err =>
        res.send("err"))
}) 

app.listen(4000,function(){
    console.log("server started")
}) 
     
const mongoose = require('mongoose')

const userschema = new mongoose.Schema({

    name:String,
    email:String,
    consent:String
    


})

module.exports = mongoose.model( 'Userdata',userschema);

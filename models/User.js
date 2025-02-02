const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        require : [true , 'Please Provide Name'],
        maxLength : 30 ,
        minLength : 3
    },
    email : {
        type : String,
        require : [true , 'Please Provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ], 
        unique : true
    } , 
    password : {
        type : String , 
        require : [true , 'Please Provide Passwrod'],
        minLength : 6
    }
})

module.exports = mongoose.model('User' , UserSchema)
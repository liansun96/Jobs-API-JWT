const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

UserSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign(
        {userId : this._id , name : this.name},
        process.env.JWT_SECRET,
        {expiresIn : '10h'}
    )
}

UserSchema.methods.comparePassword = async function(payload){
    const isMatch = await bcrypt.compare(payload , this.password)
    return isMatch
}

module.exports = mongoose.model('User' , UserSchema)
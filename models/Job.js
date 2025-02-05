const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {
        type : String , 
        required : [true , 'Please Provide Name'],
        maxLength : 50
    },
    position : {
        type : String , 
        required : [true , 'Please Provide Position'],
        maxLength : 100
    },
    status : {
        type : String,
        enum : ['interview' , 'declined' , 'pending'],
        default : 'Pending'
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , 'Please Provide User']
    }
},{timestamps : true})

module.exports = mongoose.model('Job' , JobSchema)
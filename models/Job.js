const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : [true , 'Please Provide Name'],
        maxLength : 50
    },
    position : {
        type : String , 
        require : [true , 'Please Provide Position'],
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
        require : [true , 'Please Provide User']
    }
})

module.exports = mongoose.model('Job' , JobSchema)
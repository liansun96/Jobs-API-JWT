const { StatusCodes } = require("http-status-codes")
const Job = require("../models/Job")
const  jwt  = require("jsonwebtoken")

const getAllJobs = async (req , res) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort('-createdAt')
    
    res.status(StatusCodes.OK).json({nbHits : jobs.length , jobs})
}

const getJob = async (req , res) => {
    const {user , params} = req
    console.log(user , params);

    const job = await Job.findById({_id : params.id , createdBy : user.userId})
    console.log(job);
    
   
    res.status(StatusCodes.OK).json({job})
}

const createJob= async(req, res) => {    
    req.body.createdBy = req.user.userId
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async(req , res) => {
    res.send('Update Job')
}

const deleteJob = async(req , res) => {
    res.sned('Delete Job')
}

module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob }
const { StatusCodes } = require("http-status-codes")
const Job = require("../models/Job")
const  jwt  = require("jsonwebtoken")
const NotFoundError = require("../errors/not-found")
const BadRequestError = require("../errors/bad-request")

const getAllJobs = async (req , res) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort('-createdAt')
    
    res.status(StatusCodes.OK).json({nbHits : jobs.length , jobs})
}

const getJob = async (req , res) => {
      
    const {user : {userId} , params : {id : jobId}} = req
    // console.log(userId , jobId);    
    const job = await Job.findById({_id : jobId , createdBy : userId})

    if(!job){
        throw new NotFoundError(`No Job Wiht id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const createJob= async(req, res) => {    
    req.body.createdBy = req.user.userId
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async(req , res) => {
    const {user : {userId} , params : {id : jobId} , body : {company , position}} = req

    console.log(company , position);    
    if(!company || !position ){
        throw new BadRequestError('Company and Position Field cannot be empty!')
    }

    const job = await Job.findByIdAndUpdate(
        {_id : jobId , createdBy : userId},
        req.body,
        {new : true}
    )

    if(!job){
        throw new NotFoundError(`No job wiht id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async(req , res) => {
    const {user : {useId} , params : {id : jobId}} = req

    const job = await Job.findByIdAndDelete({_id : jobId})

    if(!job) {
        throw new NotFoundError(`No Job Wiht Id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob }
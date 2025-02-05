const { StatusCodes } = require("http-status-codes")
const Job = require("../models/Job")

const getAllJobs = async (req , res) => {
    res.send('Get All Jobs')
}

const getJob = async (req , res) => {
    res.send('Get Single Job')
}

const createJob = async(req , res) => {
    // req.body.createdBy = req.user.userId

    // const job = await Job.create(req.body)

    // console.log(req.body)
    // console.log(job)
    // res.status(StatusCodes.CREATED).json(job)
    res.send('create job')
}

const updateJob = async(req , res) => {
    res.send('Update Job')
}

const deleteJob = async(req , res) => {
    res.sned('Delete Job')
}

module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob }
const getAllJobs = async (req , res) => {
    res.send('Get All Jobs')
}

const getJob = async (req , res) => {
    res.send('Get Single Job')
}

const createJob = async(req , res) => {
    res.send('Create Job')
}

const updateJob = async(req , res) => {
    res.send('Update Job')
}

const deleteJob = async(req , res) => {
    res.sned('Delete Job')
}

module.exports = {getAllJobs , getJob , createJob , updateJob , deleteJob }
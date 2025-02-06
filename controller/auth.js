const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")
const BadRequestError = require("../errors/bad-request")
const UnauthenticatedError = require("../errors/unauthenticated")

const register = async(req , res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user : {name : user.name } , token})
}

const login = async(req , res) => {
    const {email , password } = req.body
    // console.log(email , password);
    
    if(!email || !password){
        throw new BadRequestError('Please Provide Email & Password')
    }

    const user = await User.findOne({email})

    // console.log(user);    

    if(!user){
        throw new UnauthenticatedError('Invilid email , Please Provide Valid Email')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invilid Passwrod , Please Provide Correct Password')
    }
    
    // console.log(isPasswordCorrect)

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user : {name : user.name } , token})

}


module.exports = {register , login} 
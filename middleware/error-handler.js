const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require("../errors/custom-error")

const errorHandlerMiddleware = (err, req , res , next) => {

    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || 'Something Went Wrong Please Try Again Later'
    }

    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({msg : err.message})
    // }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item) =>item.message).join(', ')
        // console.log(Object.values(err.errors))
        console.log(err)
        customError.statusCode = 400
    }

    if(err.code && err.code === 11000){
        customError.msg = `Duplicate value enter for ${err.keyValue} field , Please chose another value`,
        customError.statusCode = 400
    }

    if(err.name === 'CastError'){
        customError.msg = `No Task With id : ${err.value._id}`,
        customError.statusCode = 404
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg : customError.msg})
}

module.exports = errorHandlerMiddleware



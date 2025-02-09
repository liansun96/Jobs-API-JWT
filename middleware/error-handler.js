// const { StatusCodes } = require("http-status-codes")
// const CustomAPIError = require("../errors/custom-error")

// const errorHandlerMiddleware = (err, req , res , next) => {

//     let customError = {
//         statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//         msg : err.message || 'Something Went Wrong Please Try Again Later'
//     }

//     // if(err instanceof CustomAPIError){
//     //     return res.status(err.statusCode).json({msg : err.message})
//     // }

//     if(err.name === 'ValidationError'){
//         customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
//         console.log(Object.values(err.errors).map((item) => console.log(item.message)))
//         customError.statusCode = 400
//     }

//     if(err.name === 'ValidationError'){
//         customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
//         customError.statusCode = 400
//     }

//     if(err.code && err.code === 11000){
//         customError.msg = `Duplicate value enter for ${err.keyValue} field , Please chose another value`,
//         customError.statusCode = 400
//     }

//     if(err.name === 'CastError'){
//         customError.msg = `No Task With id : ${err.value._id}`,
//         customError.statusCode = 404
//     }

//     // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
//     return res.status(customError.statusCode).json({msg : customError.msg})
// }

// module.exports = errorHandlerMiddleware


const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // MongoDB Duplicate Key (E11000)
  else if (err.code === 11000 && err.name === "MongoServerError") {
    customError.message = `Duplicate value for: ${Object.keys(err.keyValue)}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Mongoose CastError (e.g., invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    customError.message = `Invalid ${err.path}: ${err.value._id}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // Optional: Log the error for debugging
  console.error(err);

  return res.status(customError.statusCode).json({
    success: false,
    error: customError.message,
  });
};

module.exports = errorHandlerMiddleware;


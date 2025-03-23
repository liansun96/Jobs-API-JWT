const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')

const authMiddleware = async (req , res , next ) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
         throw new UnauthenticatedError('Authentication Invilid')
    }

    const token = authHeader.split(' ')[1]

    try {
         const payload = jwt.verify(token , process.env.JWT_SECRET)
         req.user = {userId : payload.userId , name : payload.name}
         next()
    } catch (error) {
         throw new UnauthenticatedError('Authentication Invilid')
    }
}

const auht = async(req , res , next) => {
     const authHeader = req.header.authorization

     if(!authHeader || !authHeader.startsWiht('Bearer ')){
          throw new UnauthenticatedError('Authentication Invilid')
     }

     const token = authHeader.split(' ')[1]

     try {
          const payload = jwt.verify(token , process.env.JWT_SECRET)
          req.user = {userId : payload.userId , name : payload.name }
     } catch (error) {
          throw new UnauthenticatedError('Authentication Invlilid')
     }
}



module.exports = authMiddleware
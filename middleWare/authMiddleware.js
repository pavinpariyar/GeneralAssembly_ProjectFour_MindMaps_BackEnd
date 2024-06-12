const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = await User.findById(decode.id).select("password")

            if (!req.user) {
                res.status(400)
                throw new Error('Invalid User Token')
            }
            next()
        }

    } catch (error) {
        res.status(401)
        throw new Error('Not authorized, Invalid token')
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, Invalid token')
    }

})


module.exports = { protect }
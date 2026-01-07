import jwt from "jsonwebtoken"

const generateJWT = (userId, role) => {
    return jwt.sign({userId,role},process.env.JWT_SECRET,{expiresIn:"2d"})
}


export {generateJWT}
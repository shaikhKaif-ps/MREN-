import jwt from jsonwebtoken


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message : "Authorization token missing"
            })
        }

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode , "decode value");
        
        req.user = decode

        next()
    } catch (error) {
        console.log(error, "Error in AuthMiddleware");
            return res.status(401).json({
            message: "Invalid or expired token",
        });
        
    }
}


const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
      message: "Access denied. Admin only.",
    });

    }
    next()
}

export {isAdmin,authMiddleware}
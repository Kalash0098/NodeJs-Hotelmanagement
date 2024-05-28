const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) =>{

    //first check the request headers has authorization or not
    const authorization  = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'token not found'});


    //Extract the jwt token from request header
    const token  = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        // verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user info to the req obj
        //here  we add all deoded payload into new user obj we can give it any name 
        req.user = decoded;
        next();
    }catch(err){
            console.error(err);
            res.status(401).json({error: 'Invalid token'});
    }
}
//func to generate token
const generateToken = (userData) => {
//generate jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
    //token with expire time
    // return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: 30});
}

module.exports = {jwtAuthMiddleware, generateToken};
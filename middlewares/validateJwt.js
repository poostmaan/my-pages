const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => { 
    const token= req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({ ok: false, error: [{msg: 'token was not provided'}] });
    };
    
    try {
        const tokenIsValid = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.id = tokenIsValid.id,
        req.user = tokenIsValid.user
    } catch (error) {
        return res.status(500).json({ ok: false, error: [{msg: 'token is invalid'}] });
    }

    next();
}

 module.exports = { validateJwt }
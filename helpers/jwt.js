const jwt = require("jsonwebtoken");

const generateJwt = ( id, user ) => { 
    return new Promise((resolve, reject) => {
        const payload = { id, user };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject(err)
            }

            resolve(token);
        }) 
    })
}

module.exports = { generateJwt };
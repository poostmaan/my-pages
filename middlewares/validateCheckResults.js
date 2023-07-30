const { validationResult } = require("express-validator");

const validateCheckResults = (req, res, next) => {  
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            message: "Validation failed!",
            error: errors.array()
        })
    }

    next();

}

module.exports = { validateCheckResults };
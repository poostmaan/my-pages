const {model , Schema} = require('mongoose'); 

const userScheme = Schema({
    user: {
        type: String,
        min: 3,
        max: 20,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16
    }
})

module.exports = model('User', userScheme);
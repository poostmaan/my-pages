const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const signin = async(req, res) => { 
    const { user, password } = req.body;
    console.log(req.body);

    try {
        const userInstance = await User.findOne({ user });
        if(!userInstance) {
            return res.status(400).json({ ok: false,  error: [{ msg: "User not found" }] });
        }

        const passwordIsCorrect = bcrypt.compareSync(password, userInstance.password);
        if(!passwordIsCorrect) {
            return res.status(400).json({ ok: false, error: [{ msg: "wront password" }] });
        }

        delete userInstance.__v;

        return res.status(200).json({ ok: true, id: userInstance._id, user })

    } catch (err) {
        return res.status(500).json({ ok: false, error: [{msg: err }]});
    }
}

const getUsers = async(req, res) => {
    res.json({getUsers: 'getUsers'})
}
const getUser = async(req, res) => {
    res.json({getUser: 'getUser'})
}
const createUser = async(req, res) => {
    
    try {
        
        const user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt); 

        await user.save()

        res.status(201).json({ ok: true, ...user})

    } catch (error) {
        res.status(400).json({ ok: false, message: 'something went wrong' + error})
    }

    
}
const putUser = async(req, res) => {
    res.json({putUser: 'putUser'})
}
const deleteUser = async(req, res) => {
    res.json({deleteUser: 'deleteUser'})
}

module.exports = {
    signin,
    getUsers,
    getUser,
    createUser,
    putUser,
    deleteUser,
}
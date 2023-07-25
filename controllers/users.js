const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const signin = async(req, res) => { 
    const { user, password } = req.body;

    try {
        const userInstance = await User.findOne({ user });
        if(!userInstance) {
            res.status(400).json({ message: "User not found"});
        }

        const passwordIsCorrect = bcrypt.compareSync(password, userInstance.password);
        if(!passwordIsCorrect) {
            res.status(400).json({ message: "wront password"});
        }

        delete userInstance.__v;

        res.status(200).json({ ok: true, id: userInstance._id, user })

    } catch (error) {
        res.status(500).json({ message: "fallo" + error});
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
        res.status(400).json({message: 'something went wrong' + error})
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
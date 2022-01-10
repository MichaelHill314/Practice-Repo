const User  = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt
        .hash(req.body.password, salt)
        .then((hash) => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                portalUserName: req.body.portalUserName,
                patientId: req.body.patientId
            })
            user.save().then(() => {
                res.status(201).json({
                    message: 'User Created',
                    user
                })
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
    })
}

exports.login = (req, res) => {
    let search = { email: req.body.email }

    User.findOne(search).then((user) => {
        if (!user) {
            return res.status(401).json({
                error: new Error('User not found!')
            })
        }

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if(err) {
                throw err
            } else if(!isMatch) {
                console.log('password does not match')
            } else{
                console.log('Successful')
                const token = jwt.sign({ userId: user._id}, process.env.JWTSECRET, {
                    expiresIn: '12h'
                })
                res.status(200).json({
                    userId: user._id,
                    email:user.email,
                    token: token,
                    portalUserName: user.portalUserName,
                    patientId: user.patientId
                })
            }
        })
    })
}
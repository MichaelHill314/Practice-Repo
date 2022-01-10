const db = require('../models')


// get ALL users
exports.getUsers = (req, res) => {
    db.User.find(req.query)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(`error: ${err}`))
}

//get Single User By ID

exports.getUserById = (req, res) => {
    db.User.findById(req.params.id)
    .then((user) => {res.status(200).json(user)})
    .catch((err) => res.status(400).json(`error: ${err}`))
}

// Delete a User

exports.destroyUser = (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "successfully deleted" }))
    .catch((err) => res.status(400).json({ error: err }))
}


// edit a user based on Id
exports.updateUser = (req, res) => {
    db.User.findByIdAndUpdate(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ error: err }))
}

exports.verifyJwt = (req, res) => {
    const token = req.headers.authorization

    jwt.verify(
        token,
        process.env.JWTSECRET,
        function(err, data){
            if(err) return res.status(500).json({ message: 'Token Expired' })
            else return res.status(200).json({ message: `verified user: ${data.userId}`})
        }
    )
}

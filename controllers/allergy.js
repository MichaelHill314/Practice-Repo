const db = require('../models')


//get allergy Allergys
exports.getAllergys = (req, res) => {
    db.Allergy.find({ users: req.params.id })
    .then((allergy) => res.status(200).json(allergy))
    .catch((err) => res.status(400).json(`error: ${err}`))
}


// Delete a allergy

exports.deleteAllergy = (req, res) => {
    db.Allergy.findByIdAndDelete(req.params.id)
    .then((allergy) => res.status(200).json(allergy))
    .catch((err) => res.status(400).json(`error: ${err}`))
}


// edit a allergy based on Id
exports.deleteAllergy = (req, res) => {
    db.Allergy.findByIdAndUpdate(req.params.id)
    .then((allergy) => res.status(200).json(allergy))
    .catch((err) => res.status(400).json(`error: ${err}`))
}

// creates and adds a new allergy to the user
exports.addAllergy = async (req, res) => {
    const { name, reaction, users } = req.body
    try{
        const newAllergy = new db.Allergy ({
            name,
            reaction,
            users
        })
        if(!name){
            throw new Error('Allergy Name Required')
        }else if(!reaction){
            throw new Error('Reaction Required')
        }else if(!users){
            throw new Error('user Required')
        }
        db.Allergy.create(newAllergy)

        const user = await db.User.findById(req.body.users)
        user.allergys.push(newAllergy)
        user.save()
        res.status(201).json({ message:'Successfully Added Allergy', user })
    } catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

//some stuff
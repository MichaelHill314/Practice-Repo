const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
{
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    portalUserName: {
        type: String,
        required: true
    },
    patientId:{
        type: Number,
        required:true
    },
    allergys: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Allergy'
        }
    ]
}
)

const User = mongoose.model('User', userSchema)
module.exports = User
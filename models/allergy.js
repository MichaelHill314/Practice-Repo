const mongoose = require('mongoose')

const allergySchema = new mongoose.Schema(
    {
        users:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
       name: {
           type: String,
           required: false
       },
       reaction: {
           type: String,
           required:false
       }
    }
    )
    
    const Allergy = mongoose.model('Allergy', allergySchema)
    module.exports = Allergy

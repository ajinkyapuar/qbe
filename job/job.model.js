const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    images: [
     {   
       type: String
    }
    ]
})

// projectSchema.set('toJSON',{
//     virtuals:true
// });

module.exports = mongoose.model('Job', jobSchema)




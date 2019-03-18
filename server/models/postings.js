const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postingSchema = new Schema({
    author :{ type: Schema.Types.ObjectId, ref: 'User' },
    title : String,
    text : String,
    image : String,
    tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    category : String
},{ timestamps : true})

const Posting = mongoose.model('Posting', postingSchema)

module.exports = Posting
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    marker: {        
        type:Schema.Types.ObjectId, 
        ref: 'Marker', 
        required:true
    },
    user: {
        type:Schema.Types.ObjectId, 
        ref: 'User', 
        required:true
    },
    content: {type:String, required:true},
    postDate: {
        type:Date,
        default:Date.now
    }
})


export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
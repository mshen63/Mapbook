const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const opts = {toJSON: {virtuals: true}}

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

// CommentSchema.virtual('timeSincePost')
// .get(function() {
//     return formatDistance(
//         this.postDate, 
//         Date.now(),
//         {addSuffix: true}
//     )
// })


export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
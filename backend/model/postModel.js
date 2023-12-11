const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    postText: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
{
    timestamps: true
});

const postData = mongoose.model('Post', postSchema);

module.exports = postData;


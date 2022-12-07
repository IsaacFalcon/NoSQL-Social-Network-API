const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
       username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
       },
       email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must be a valid email!'
        ]
       },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    }, {
       toJSON: {
        virtuals: true
       } 
    });

    userSchema.virtuals('friend count').get(function() {
       return this.friends.length; 
     });
     const User = model('User', userSchema);
     module.exports = User;
const mongoose = require('mongoose')

const User = mongoose.model('User', {

    name: String,
    email: String,
    password: String,

})
module.exports = User;

/*const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
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
    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('userschemas',UserSchema)
*/
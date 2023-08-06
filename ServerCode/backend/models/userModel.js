const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    uname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter user name'],
    },
    city: {
        type: String,
        required: [true, 'Please enter city'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        unique: false,
    }
})

module.exports = mongoose.model('users', userSchema)
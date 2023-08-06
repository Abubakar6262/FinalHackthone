const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    pname: {
        type: String,
        required: true,
        required: [true, 'Please enter Product Name'],
    },
    pcatagory: {
        type: String,
        required: [true, 'Please enter Product Catagory'],
    },
    pprice: {
        type: Number,
        required: [true, 'Please enter product Price'],
    },
    pcolor: {
        type: String,
        required: [true, 'Please enter product color'],
    },
    psize: {
        type: String,
        required: [true, 'Please enter Product Size'],
    },
})

module.exports = mongoose.model('products', productSchema)
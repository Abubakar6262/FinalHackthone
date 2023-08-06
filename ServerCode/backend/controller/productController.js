const productModel = require('../models/productModel')
const asynchandler = require('express-async-handler')

const AddProduct = asynchandler(async (req, res) => {
    console.log('Product data =>', req.body);
    const { pname, pcatagory, pcolor, pprice, psize } = req.body;
    const newproduct = await productModel.create({
        pname,
        pcatagory,
        pcolor,
        pprice,
        psize,
    })
    if (newproduct) {
        res.status(200).json({ message: 'Product added successfully' })
    } else {
        res.status(400).json({ message: 'Product can not added successfully' })
    }

});

const GetProduct = asynchandler(async (req, res) => {
    try {
        const products = await productModel.find();
        console.log(products);
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
});

module.exports = {
    AddProduct,
    GetProduct,
}
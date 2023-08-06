const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT

connectDB()



app.use('/account/users', require('./routes/UserRoutes'))
app.use('/product/addproduct', require('./routes/Products'))

app.listen(PORT, (req, res) => {
    console.log(`Server is running successfully on port: ${PORT}`);
})

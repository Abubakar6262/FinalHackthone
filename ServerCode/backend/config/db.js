const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOS_URI)
        console.log(`Database connect : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB
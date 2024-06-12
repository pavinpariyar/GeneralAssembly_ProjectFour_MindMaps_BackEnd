const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connection established at : ${connection.connection.host} with ${connection.connection.name}`)
    } catch (error) {
        console.error(`Error while connecting to ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB
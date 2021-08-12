const mongoose = require('mongoose')
const mongoURL = 'mongodb+srv://dhruv123:dhruv123@devconnector.7ctcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB Connected')
    } catch (err) {
        console.log(err.message)
        //Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB
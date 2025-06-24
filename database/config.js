const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('MongoDB connected successfully');
    } catch (error) {
        resizeBy.status(500).json({
            ok: false,
            msg: 'Error connecting to MongoDB',
        })
        console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
    }
}

module.exports = {
    connectDB
};
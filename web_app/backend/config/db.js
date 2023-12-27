import mongoose from 'mongoose'
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:samiradmin@cluster0.b1p7eko.mongodb.net/emart_db2?retryWrites=true&w=majority")
        console.log(`CONNECTED TO DATABASE: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(process.env.DB_URL)
        console.log(`error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB
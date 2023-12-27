import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import path from 'path'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import productRoutes from './routes/productsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import webhookRoutes from './routes/webhookRoutes.js'

dotenv.config()
const app = express()
connectDB()

const PORT = process.env.PORT || 4000
const __dirname = path.resolve()

app.use('/api/stripe', webhookRoutes)
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.urlencoded({extended: false }))
app.use(cors({origin: true, credentials: true}))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.json({message: "API is Running!"})
    })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`.green.bold)
})
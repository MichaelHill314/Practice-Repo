const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const connectDB = require('./db')
const dotenv = require('dotenv')
const cors = require('cors')
const compression = require('compression')

const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const allergyRouter = require('./routes/allergys')


connectDB()

const app = express()

//security
app.use(helmet())

// console logger
app.use(morgan('dev'))


app.use(compression())
app.use(express.json({ extended: false }))

app.use(cors({ origin: '*' }))

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

// connecting app to routes
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/allergy', allergyRouter)


let currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/New_York'
})

// app routes

app.get('/', ( req, res ) => {
    res.send({
        status:200,
        currentTime,
        message: 'Server is running'
    })
})

module.exports = { app, currentTime }
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// Middleware
// This is to recognize incoming request data as a JSON object.
app.use(express.json())
// This one expects incoming request data to be encoded in the URL.
app.use(express.urlencoded({ extended: false}))

//Declare the path to the API/routes here
app.use('/api/gettest', require('./routes/testRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));

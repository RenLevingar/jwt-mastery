const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const userRoute = require("./routes/task-people-controller")
const connectDB = require("./db/connect")
const port = 5000;

// Middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())


// Body parser
app.use(express.urlencoded({extended: false}));

// CheckPath
app.get('/',(req,res)=>{
    res.send('Server is Working'
    )
})

// Routes
app.use("/users",userRoute);

const initServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(9000, () => {
            console.log('server listening on port 9000')
        })
    } catch (err) {
        console.log(err)
    }
}

initServer()
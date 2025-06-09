//A GOOD CODE IS ALWAYS EASY TO READ AND I TRIED TO WRITE A GOOD CODE


//store-sreach-api 
/*in this project the aim is to provide a search options for a user of a 
store thet sells goods and this api gives the user the ability 
to search through goods */

require('express-async-errors'); //for try catch block in controllers section 
require('dotenv').config(); //for .env file that has url connection string

const express = require('express');
const app = express();
const connectDB = require("./db/connectDB");
const router = require('./routes/routes');//importing router to be able to use it
//importing errorhandler that is actually our custom error
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/notFound');
//middlewares
app.use(express.json()); //to be able to send json as responses


//routes
app.use('/api/v1/goods', router);

app.use(errorHandlerMiddleware);
app.use(notFound); ///IF A GIVEN ROUTE NOT POSSIBLE THIS WILL HANDLE IT


const port = process.env.PORT || 5000; //port


//function that runs the app and connect it to the database
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log('Server is Listening...');
        })
    } catch(error) {
        console.log(error);
    }
}
start();
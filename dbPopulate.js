const productsList = require("./products-list.json");
const connectDB = require('./db/connectDB');
const Goods = require("./model/Goods");
require('dotenv').config();

const startPopulate = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('connected to the DataBase...');
        await Goods.deleteMany();
        console.log("previous data has been deleted from database...");
        await Goods.create(productsList);
        console.log('new data added to the database...');
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};
startPopulate();
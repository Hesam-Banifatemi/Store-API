const mongoose = require('mongoose');


const goodsSchema = new mongoose.Schema( {
    id: {
        type: Number,
        unique: true,
        required: [true, "Please Provide id"]
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    price: {
        type: Number,
        required: [true, 'add price please']
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ["men's clothing", "jewelery", "electronics", "women's clothing"],
            message: "please provide a suppoted category..."
        }
    },
    image: {
        type: String,
        required: false
    },
    rating: {
        rate: {
            type: Number,
            required: false
        },
        count: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model("Goods", goodsSchema);
import mongoose from "mongoose";

// schemea define for databas
const productSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        }, 
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        sold: {
            type: Boolean,
            required: true
        },
        dateOfSale: {
            type: Date,
            required: true
        }
})

const productModel = new mongoose.model('product_transactions', productSchema);

export default productModel;

import { mongoose } from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
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
    stock: {
        type: Number,
        default: 0
    },
    inStock: {
        type: Boolean,
        default: false
    },
    brand: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'brand'
    },
    category: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'category'
    },
    sku: {
        type: String
    },
    colors:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'colors'
    },
    image: [{
        type: String,
        // required: true
    }],
    freeShipping:{
        type:Boolean,
        default: false
    }
})

const product = mongoose.models.product || mongoose.model('product', productsSchema) 
export default product
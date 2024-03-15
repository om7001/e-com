import {mongoose} from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        qty: {
            type: Number,
            required: true
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "colors"
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    total: {
        type: Number,
        required: true
    }
});

const cart = mongoose.models.cart || mongoose.model("cart", CartSchema)
export default cart
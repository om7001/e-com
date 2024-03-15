import {mongoose} from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wishlist"
    }
});

const user = mongoose.models.user || mongoose.model("user", UserSchema)
export default user
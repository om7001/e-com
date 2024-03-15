import {mongoose} from "mongoose";

const WishlistSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const wishlist = mongoose.models.wishlist || mongoose.model("wishlist", WishlistSchema)
export default wishlist
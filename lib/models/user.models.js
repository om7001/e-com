import {mongoose} from "mongoose";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

UserSchema.methods.generateAccessToken = async function () {
    const userObject = { ...this.toObject() }
    return jwt.sign(
        userObject,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}

UserSchema.pre('save', async function (next) {
    if (!this.password) return next()
    if (this.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const user = mongoose.models.user || mongoose.model("user", UserSchema)
export default user
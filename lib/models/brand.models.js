import { mongoose } from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const brand = mongoose.models.brand || mongoose.model('brand', brandSchema)
export default brand
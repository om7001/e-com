import { mongoose } from "mongoose";

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const brand = mongoose.models.brand || mongoose.model('brand', BrandSchema)
export default brand
import { mongoose } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const category = mongoose.models.category || mongoose.model('category', CategorySchema) 
export default  category
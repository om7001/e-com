import { mongoose } from "mongoose";

const colorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hexCode: {
        type: String,
        required: true
    }
})

const color = mongoose.models.colors || mongoose.model('colors', colorsSchema)
export default color
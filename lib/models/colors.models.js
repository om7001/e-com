import { mongoose } from "mongoose";

const ColorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hexCode: {
        type: String,
        required: true
    }
})

const color = mongoose.models.colors || mongoose.model('colors', ColorsSchema)
export default color
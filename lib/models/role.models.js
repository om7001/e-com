import {mongoose} from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    }
});

const role = mongoose.models.role || mongoose.model("role", RoleSchema)
export default role
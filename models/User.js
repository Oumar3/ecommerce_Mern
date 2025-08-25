import {Schema,model} from "mongoose";

const UserSchema = new Schema({
    "username": {
        type: String,
        required: true
    },
    'firstname': {
        type: String,
        required: false
    },
    "lastname": {
        type: String,
        required: false
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "avatar": {
        type: String,
        required: false
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
})

const User = model("User", UserSchema);
export default User;

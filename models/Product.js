import {Schema,model} from "mongoose";

const ProductSchema = new Schema({
    "name": {
        type: String, 
        required: true 
    },
    "description": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "stock": {
        type: Number,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    // "userId": {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    // },
    "createdAt": {
        type: Date,
        default: Date.now
    }
})

const Product = model("Product", ProductSchema);
export default Product;

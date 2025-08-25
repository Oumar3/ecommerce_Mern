import mongoose from "mongoose";
import Product from "../models/Product.js";

const getProduct = async(req,res) =>{
    try {
        const products = await Product.find();
        if(!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({ message: "Products retrieved successfully", data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async(req,res)=>{
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product retrieved successfully", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getProduct, getProductById, createProduct, updateProduct };
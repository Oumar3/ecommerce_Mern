import mongoose from "mongoose";
import services from "../services/productService.js";

const getProduct = async (req, res) => {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 0; // 0 = pas de limite (tous les produits)

    try {
        let products = await services.getProducts(page, limit, search);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ message: "Products retrieved successfully", data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async(req,res)=>{
    const id = req.params.id;
    try{
        const product = await services.getProductById(id);
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
        const newProduct = await services.createProduct(req.body);
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
        const updatedProduct = await services.updateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const deletedProduct = await services.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getProduct, getProductById, createProduct, updateProduct, deleteProduct };
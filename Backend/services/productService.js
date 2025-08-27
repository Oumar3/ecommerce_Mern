import Product from "../models/Product.js";

const getProducts = async (page, limit, search) => {
    let query = {};
    if (search) query.name = { $regex: search, $options: "i" };

    let productsQuery = Product.find(query);

    if (limit > 0) {
        productsQuery = productsQuery.skip((page - 1) * limit).limit(limit);
    }

    return await productsQuery;
};

const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        throw new Error("Error fetching product");
    }
};

const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw new Error("Error creating product");
    }
};

const updateProduct = async (id, productData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        return updatedProduct;
    } catch (error) {
        throw new Error("Error updating product");
    }
};

const deleteProduct = async (id) => {
    try {
        await Product.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting product");
    }
};


export default {getProducts, getProductById, createProduct, updateProduct, deleteProduct };
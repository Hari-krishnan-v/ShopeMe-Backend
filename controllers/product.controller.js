import Product from '../models/products.models.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try{
        const {name,description,category,price,stock_quantity,sku} = req.body;

        if(!name || !description || !category || !price || !stock_quantity || !sku) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingProduct = await Product.findOne({ sku }).session(session);

        if(existingProduct) {
            return res.status(400).json({ error: 'Product with this SKU already exists' });
        }

        const newProduct = await Product.create([{
            name,
            description,
            category,
            price,
            stock_quantity,
            sku,
            qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(sku)}&size=150x150`
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Product created successfully',
            product: {
                id: newProduct[0]._id,
                name: newProduct[0].name,
                description: newProduct[0].description,
                category: newProduct[0].category,
                price: newProduct[0].price,
                stock_quantity: newProduct[0].stock_quantity,
                sku: newProduct[0].sku,
                qr_code_url: newProduct[0].qr_code_url
            }
        });

    }catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, description, category, price, stock_quantity, sku } = req.body;

        if (!name || !description || !category || !price || !stock_quantity || !sku) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = await Product.findById(req.params.id).session(session);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const existingProduct = await Product.findOne({ sku }).session(session);
        if (existingProduct && existingProduct._id.toString() !== product._id.toString()) {
            return res.status(400).json({ error: 'Product with this SKU already exists' });
        }

        product.name = name;
        product.description = description;
        product.category = category;
        product.price = price;
        product.stock_quantity = stock_quantity;
        product.sku = sku;
        product.qr_code_url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(sku)}&size=150x150`;

        await product.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Product updated successfully',
            product: {
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock_quantity: product.stock_quantity,
                sku: product.sku,
                qr_code_url: product.qr_code_url
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const product = await Product.findById(req.params.id).session(session);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await Product.deleteOne({ _id: req.params.id }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


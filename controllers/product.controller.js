import Product from '../models/products.models.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try{
        const {name,description,category,price,stock_quantity,sku} = req.body;

    }catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
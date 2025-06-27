import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock_quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    sku: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    qr_code_url: {
        type: String,
        required: true,
        trim: true,
    },
},{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
import mongoose from "mongoose";

const stockLogSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    action: {
        type: String,
        enum: ['add', 'remove'],
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: ['purchase', 'sale', 'return', 'adjustment'],
        trim: true
    },
    related_bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: false
    }
}, {
    timestamps: true,
}
);
const StockLog = mongoose.model('StockLog', stockLogSchema);
export default StockLog;
import mongoose from "mongoose";

const billsSchema = new mongoose.Schema({
    bill_number: {
        type: String,
        required: true,
        trim: true,
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total_amount: {
        type: Number,
        required: true,
        min: 0
    },
    payment_mode: {
        type: String,
        enum: ['cash', 'card', 'online'],
        required: true
    },
    upi_qr_code: {
        type: String, // base64 or URL
        required: function() { return this.payment_mode === 'online'; }
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    gst_details: {
        percentage: {
            type: Number,
            default: 18
        },
        amount: {
            type: Number,
            default: 0
        }},
    grand_total: {
        type: Number, // total + gst
        required: true
    }
    }, {
        timestamps: true,
}
);
const Bill = mongoose.model('Bill', billsSchema);
export default Bill;
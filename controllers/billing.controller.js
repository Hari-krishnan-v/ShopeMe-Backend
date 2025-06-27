import billsModels from "../models/bills.models.js";
import StockLog from "../models/stock_log.models.js";
import mongoose from "mongoose";

export const createBill = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

    const {staff_id,items, total_amount, payment_method} = req.body;

    if(!staff_id || !items || !total_amount || !payment_method) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    let paymentstatus = 'pending';

    const currentDate = new Date();

    const billNumber = `BILL-${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;

    const gstPercentage = 18; // Assuming a fixed GST percentage

    const gstAmount = (total_amount * gstPercentage) / 100;

    const grandTotal = total_amount + gstAmount;

    if(payment_method !== 'cash' && payment_method !== 'card' && payment_method !== 'online') {
        return res.status(400).json({ error: 'Invalid payment method' });
    }
    if(payment_method === 'cash'){
        paymentstatus = 'completed';
    }

    const newBill = await billsModels.create([{
        bill_number: billNumber,
        staff_id,
        items,
        total_amount,
        payment_mode: payment_method,
        payment_status: paymentstatus,
        gst_details: {
            percentage: gstPercentage,
            amount: gstAmount
        },
        grand_total: grandTotal
    }
    ], { session });

    // Update stock for each item in the bill

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
        message: 'Bill created successfully',
        bill: {
            id: newBill[0]._id,
            bill_number: newBill[0].bill_number,
            staff_id: newBill[0].staff_id,
            items: newBill[0].items,
            total_amount: newBill[0].total_amount,
            payment_mode: newBill[0].payment_mode,
            payment_status: newBill[0].payment_status,
            gst_details: newBill[0].gst_details,
            grand_total: newBill[0].grand_total
        }
    });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
import {Router} from "express";
import {
    createBill,
    getAllBills,
    getBillById,
}   from "../controllers/billing.controller.js";

const BillingRouter = Router();

BillingRouter.get('/', getAllBills);
BillingRouter.get('/:id', getBillById);
BillingRouter.post('/', createBill);

export default BillingRouter;
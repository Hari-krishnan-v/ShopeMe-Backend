import {Router} from "express";
import {
    getStaffProfile,
    createStaff,
    deleteStaff,
    getAllStaff,
    updateStaffProfile,
    loginStaff
} from "../controllers/staff.controller.js";

const StaffRouter = Router();


StaffRouter.get('/', getAllStaff);

StaffRouter.get('/:id', getStaffProfile);

StaffRouter.post('/', createStaff);

StaffRouter.put('/:id', updateStaffProfile);

StaffRouter.delete('/:id', deleteStaff);

StaffRouter.post('/login',loginStaff)

export default StaffRouter;
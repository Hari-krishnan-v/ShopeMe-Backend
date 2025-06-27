import {Router} from "express";
import {
    getStaffProfile,
    createStaff,
    deleteStaff,
    getAllStaff,
    updateStaffProfile
} from "../controllers/staff.controller.js";

const StaffRouter = Router();



StaffRouter.get('/', getAllStaff);

StaffRouter.get('/:id', getStaffProfile);

StaffRouter.post('/', createStaff);

StaffRouter.put('/:id', updateStaffProfile);

StaffRouter.delete('/:id', deleteStaff);
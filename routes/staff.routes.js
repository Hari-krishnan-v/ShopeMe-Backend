import {Router} from "express";
import {
    getStaffProfile,
    createStaff,
    deleteStaff,
    getAllStaff,
    updateStaffProfile,
    loginStaff
} from "../controllers/staff.controller.js";
import {authenticateStaff} from "../middlewares/authentication.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const StaffRouter = Router();


StaffRouter.get('/', authenticateStaff,isAdmin,getAllStaff);

StaffRouter.get('/:id',authenticateStaff,isAdmin, getStaffProfile);

StaffRouter.post('/',authenticateStaff,isAdmin, createStaff);

StaffRouter.put('/:id',authenticateStaff,isAdmin, updateStaffProfile);

StaffRouter.delete('/:id',authenticateStaff,isAdmin, deleteStaff);

StaffRouter.post('/login',loginStaff)

export default StaffRouter;
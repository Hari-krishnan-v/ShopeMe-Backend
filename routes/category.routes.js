import {Router} from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";
import {authenticateStaff} from "../middlewares/authentication.middleware.js";


const CategoryRouter = Router();


CategoryRouter.get('/', authenticateStaff, getAllCategories);

CategoryRouter.get('/:id', authenticateStaff, getCategoryById);

CategoryRouter.post('/', authenticateStaff, createCategory);

CategoryRouter.put('/:id', authenticateStaff, updateCategory);

CategoryRouter.delete('/:id', authenticateStaff, deleteCategory);

export default CategoryRouter;
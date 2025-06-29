import {Router} from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}from "../controllers/product.controller.js";
import {authenticateStaff} from "../middlewares/authentication.middleware.js";


const ProductRouter = Router();

ProductRouter.get('/',authenticateStaff, getAllProducts);

ProductRouter.get('/:id',authenticateStaff, getProductById);

ProductRouter.post('/',authenticateStaff, createProduct);

ProductRouter.put('/:id',authenticateStaff, updateProduct);

ProductRouter.delete('/:id',authenticateStaff, deleteProduct);

export default ProductRouter;
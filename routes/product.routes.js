import {Router} from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}from "../controllers/product.controller.js";

const ProductRouter = Router();

ProductRouter.get('/', getAllProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post('/', createProduct);
ProductRouter.put('/:id', updateProduct);
ProductRouter.delete('/:id', deleteProduct);

export default ProductRouter;
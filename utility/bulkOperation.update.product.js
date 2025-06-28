import Product from "../models/products.models.js";

async function bulkOperationUpdateProduct(items, session) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items must be a non-empty array");
    }
   try {
       const bulkOps = items.map(item => ({
           updateOne: {
               filter: {_id: item.product_id, stock_quantity: {$gte: item.quantity}},
               update: {$inc: {stock_quantity: -item.quantity}}
           }
       }));

      await Product.bulkWrite(bulkOps, {session});


   }catch (e) {
         throw new Error(`Bulk operation failed: ${e.message}`);
   }
}

export default bulkOperationUpdateProduct;
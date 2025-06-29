import express from 'express';
import cookieParser from 'cookie-parser';
import {PORT} from './config/env.js';
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import StaffRouter from "./routes/staff.routes.js";
import ProductRouter from "./routes/product.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import {NODE_ENV} from "./config/env.js";
import CategoryRouter from "./routes/category.routes.js";


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if(NODE_ENV==='production'){
    app.use(arcjetMiddleware);
}

app.use(errorMiddleware);

// routers
app.use('/api/staff', StaffRouter);
app.use('/api/products', ProductRouter);
app.use('/api/bill', billingRoutes)
app.use('/api/categories', CategoryRouter)


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
    await connectDB();
});

export default app;
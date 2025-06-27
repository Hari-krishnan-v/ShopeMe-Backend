import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT} from './config/env.js';
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);



app.use(errorMiddleware);

// routers

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
    await connectDB();
});

export default app;
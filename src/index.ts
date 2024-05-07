import mongoose from "mongoose";
import express, { urlencoded } from 'express';
const app = express();
import dotenv from 'dotenv'
import { userRouter,categoryRouter,authorRouter,bookRouter } from './routes/index'
dotenv.config();
app.use(express.json());
app.use(urlencoded({extended:true}));
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || '';
app.use('/api/users', userRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/authors',authorRouter)
app.use('/api/books',bookRouter)
mongoose.connect(url).then(() => {
    console.log("Connected to the database...");
    app.listen(port, () => {
        console.log("Connected at port number ", port);
    })
}).catch((error) => {
    console.log(error.message)
})

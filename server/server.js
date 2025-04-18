import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import shortenUrl from './routes/shortenUrlRoute.js'
import connectDB from './config/dbConfig.js';
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use('/api',shortenUrl)


app.get('/',(req, res)=>{
    res.send('test')
})

app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})
import express, { urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";


const app = express();
dotenv.config();

const MongoUri = process.env.MONGOURI;
const secretKey = process.env.SECRETKEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    session({
        secret:'secretKey',
        resave:false,
        saveUninitialized:false,
        store: MongoStore.create({
            mongoUrl: `${MongoUri}/sessionStorage`,
            collectionName: 'sessions',
            ttl:14 * 24 * 60 * 60
        }),
        cookie:{
            maxAge:1000 * 60 * 60 * 24,
        }
    })
)

app.use('/authentication',authRouter);

export default app;
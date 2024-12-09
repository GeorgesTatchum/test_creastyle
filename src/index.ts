import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from './routes'

dotenv.config();

export const app: Express = express();
const PORT = process.env.PORT;
const MONGO_URL = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.dkjxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors({
  credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/', router())

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne est survenue." });
});

// connect with mongodb
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (err) => {
  console.log(err);
})

const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:3001`);
});
import "dotenv/config";
import express from "express";
import http from "http";
import { router } from "./routes";

const app = express();

const serverHttp = http.createServer(app);

app.use(express.json());

app.use(router);

export { serverHttp };

import express from "express";
import * as pugsController from "./controllers/pugs.controller";

const app = express();
app.use(express.json());

app.get("/pugs",pugsController.getAllPugs)
app.post("/pugs",pugsController.createPug)

export default app;
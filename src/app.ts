import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* for testing */
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

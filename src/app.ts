import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import usersRouter from "./app/modules/users/users.routes";

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* application route */
app.use("/api/v1/users", usersRouter);

/* for testing */
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;

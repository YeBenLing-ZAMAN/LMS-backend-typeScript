import express, { Application } from "express";
// import { NextFunction, Request, Response} from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import routers from "./app/routes";
import notFoundHandler from "./app/middleware/notFoundHandler";
// import ApiError from "./errors/ApiError";

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* application route */
app.use("/api/v1", routers);

/* for testing */
// app.get("/", (_req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error("unhandled promise rejection"));
//   throw new Error("Testing for logger bhai");
//   next("this is not a valid");
//   console.log(x);
// });

/* gobal error handle */
app.use(globalErrorHandler);

/* handle not found */
app.use(notFoundHandler);

export default app;

import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import usersRouter from "./app/modules/users/users.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* application route */
app.use("/api/v1/users", usersRouter);

/* for testing */
// app.get("/", (_req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, "this is not a valid");
//   // next("this is not a valid");
// });

/* gobal error handle */
app.use(globalErrorHandler);

export default app;

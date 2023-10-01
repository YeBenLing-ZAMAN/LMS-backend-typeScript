"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { NextFunction, Request, Response} from "express";
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(
  require("./app/middleware/globalErrorHandler")
);
const routes_1 = __importDefault(require("./app/routes"));
const notFoundHandler_1 = __importDefault(
  require("./app/middleware/notFoundHandler")
);
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import ApiError from "./errors/ApiError";
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
/* application route */
app.use("/api/v1", routes_1.default);
/* for testing */
// app.get("/", (_req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error("unhandled promise rejection"));
//   throw new Error("Testing for logger bhai");
//   next("this is not a valid");
//   console.log(x);
// });
/* gobal error handle */
app.use(globalErrorHandler_1.default);
/* handle not found */
app.use(notFoundHandler_1.default);
exports.default = app;

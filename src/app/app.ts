import express, { Application, NextFunction, Request, Response } from "express";
import { origin } from "../utils/miscellaneous/constants";
import CustomError from "../utils/lib/customEror";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import RootRouter from "./router";
import ErrorHandler from "../middleware/errorHandler/errorHandler";

class App {
  public app: Application;
  private port: number;
  private origin: string[] = origin;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddleware();
    this.initRouters();
    this.fileSender();
    this.notFoundRouter();
    this.errorHandle();
  }

  // start server
  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is started at port: ${this.port} 🚀`);
    });
  }

  // init middleware
  private initMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: this.origin, credentials: true }));
  }

  // init routers
  private initRouters() {
    this.app.get("/", (_req: Request, res: Response) => {
      res.send(`Server is running...🚀`);
    });
    this.app.get("/api", (_req: Request, res: Response) => {
      res.send(`Server API is active🚀`);
    });

    this.app.use("/api/v1", new RootRouter().v1Router);
  }

  private fileSender() {
    this.app.get("/api/assets", (req: Request, res: Response) => {
      const file = req.query as { path: string };
      if (file.path) {
        const filePath = path.resolve(
          `${__dirname}/../../uploads/${file.path}`
        );
        res.sendFile(filePath);
      } else {
        res.status(404).send("Invalid path");
      }
    });
  }

  // not found router
  private notFoundRouter() {
    this.app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
      next(new CustomError("Cannot found the route", 404));
    });
  }

  // error handler
  private errorHandle() {
    this.app.use(new ErrorHandler().handleErrors);
  }
}

export default App;

import { Router } from "express";
import AdminRouter from "./routers/admin.router";
import AdminPropertyRouter from "./routers/admin.property.router";

class AdminRootRouter {
  public router = Router();
  private adminRouter = new AdminRouter();
  private adminPropertyRouter = new AdminPropertyRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // admin router
    this.router.use("/", this.adminRouter.router);

    // admin property router
    this.router.use("/property", this.adminPropertyRouter.router);
  }
}
export default AdminRootRouter;

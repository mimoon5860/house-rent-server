import AbstractRouter from "../../abstract/abstract.router";
import AdminPropertyController from "../controllers/admin.property.controller";

class AdminPropertyRouter extends AbstractRouter {
  private controller = new AdminPropertyController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {}
}

export default AdminPropertyRouter;

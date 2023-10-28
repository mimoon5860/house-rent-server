import AbstractRouter from "../../abstract/abstract.router";
import AdminPropertyController from "../controllers/admin.property.controller";

class AdminPropertyRouter extends AbstractRouter {
  private controller = new AdminPropertyController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // create property attribute router
    this.router
      .route("/basic-attribute")
      .post(this.controller.createBasicAttribute);
  }
}

export default AdminPropertyRouter;

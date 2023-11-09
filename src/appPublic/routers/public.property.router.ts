import AbstractRouter from "../../abstract/abstract.router";
import PublicPropertyController from "../controllers/public.property.controller";

class PublicPropertyRouter extends AbstractRouter {
  protected controller = new PublicPropertyController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get property router
    this.router.route("/").get(this.controller.getProperty);

    // get single property router
    this.router.route("/:id").get(this.controller.getSingleProperty);
  }
}
export default PublicPropertyRouter;

import { Router } from "express";

class RootRouter {
  public v1Router = Router();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {}
}

export default RootRouter;

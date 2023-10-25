import AbstractRouter from "../../abstract/abstract.router";
import MemberAuthController from "../controllers/member.auth.controller";

class MemberAuthRouter extends AbstractRouter {
  private controller = new MemberAuthController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // member registration router
    this.router
      .route("/registration")
      .post(
        this.uploader.localUploadRaw(this.fileFolders.MEMBER_FILES),
        this.controller.registrationController
      );

    // member login
    this.router.route("/login").post(this.controller.loginController);
  }
}

export default MemberAuthRouter;

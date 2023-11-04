import AbstractRouter from "../../abstract/abstract.router";
import MemberController from "../controllers/member.controller";

class MemberRouter extends AbstractRouter {
  private controller = new MemberController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // profile route
    this.router
      .route("/profile")
      .get(this.controller.getProfile)
      .patch(
        this.uploader.localUploadRaw(this.fileFolders.MEMBER_FILES),
        this.controller.updateProfile
      )
      .delete(this.controller.deleteProfile);

    // change passwoard
    this.router.post("/change-password", this.controller.changePassword);
  }
}
export default MemberRouter;

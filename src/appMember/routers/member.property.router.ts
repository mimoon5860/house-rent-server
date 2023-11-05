import AbstractRouter from "../../abstract/abstract.router";
import MemberPropertyController from "../controllers/member.property.controller";

class MemberPropertyRouter extends AbstractRouter {
  protected controller = new MemberPropertyController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // Create and get Property router
    this.router
      .route("/")
      .post(this.controller.createProperty)
      .get(this.controller.getProperty);

    // upload or update property content
    this.router
      .route("/content/:id")
      .post(
        this.uploader.localUploadRaw(this.fileFolders.PROPERTY_CONTENT),
        this.controller.uploadPropertyContent
      )
      .patch(
        this.uploader.localUploadRaw(this.fileFolders.PROPERTY_CONTENT),
        this.controller.updatePropertyContent
      );

    // change property status
    this.router
      .route("/status/:id")
      .patch(this.controller.updatePropertyStatus);

    // update or get single property
    this.router
      .route("/:id")
      .get(this.controller.getSingleProperty)
      .patch(this.controller.updateProperty);
  }
}

export default MemberPropertyRouter;

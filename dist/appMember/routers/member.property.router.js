"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_property_controller_1 = __importDefault(require("../controllers/member.property.controller"));
class MemberPropertyRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new member_property_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // Create and get Property router
        this.router
            .route("/")
            .post(this.controller.createProperty)
            .get(this.controller.getProperty);
        // upload or update property content
        this.router
            .route("/content/:id")
            .post(this.uploader.localUploadRaw(this.fileFolders.PROPERTY_CONTENT), this.controller.uploadPropertyContent)
            .patch(this.uploader.localUploadRaw(this.fileFolders.PROPERTY_CONTENT), this.controller.updatePropertyContent);
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
exports.default = MemberPropertyRouter;

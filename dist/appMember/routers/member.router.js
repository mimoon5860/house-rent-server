"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_controller_1 = __importDefault(require("../controllers/member.controller"));
class MemberRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new member_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // profile route
        this.router
            .route("/profile")
            .get(this.controller.getProfile)
            .patch(this.uploader.localUploadRaw(this.fileFolders.MEMBER_FILES), this.controller.updateProfile)
            .delete(this.controller.deleteProfile);
        // change passwoard
        this.router.post("/change-password", this.controller.changePassword);
    }
}
exports.default = MemberRouter;

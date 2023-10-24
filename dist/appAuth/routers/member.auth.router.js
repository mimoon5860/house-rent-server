"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_auth_controller_1 = __importDefault(require("../controllers/member.auth.controller"));
class MemberAuthRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new member_auth_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // member registration router
        this.router
            .route("/registration")
            .post(this.uploader.localUploadRaw(this.fileFolders.MEMBER_FILES), this.controller.registrationController);
        // member login
        this.router.route("/login").post(this.controller.loginController);
    }
}
exports.default = MemberAuthRouter;

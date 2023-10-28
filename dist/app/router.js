"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberRoot_router_1 = __importDefault(require("../appMember/memberRoot.router"));
const authRoot_router_1 = __importDefault(require("../appAuth/authRoot.router"));
const authChecker_1 = __importDefault(require("../middleware/authChecker/authChecker"));
const adminRouter_1 = __importDefault(require("../appAdmin/adminRouter"));
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.authRouter = new authRoot_router_1.default();
        this.memberRouter = new memberRoot_router_1.default();
        this.adminRouter = new adminRouter_1.default();
        this.authChecker = new authChecker_1.default();
        this.callV1Router();
    }
    callV1Router() {
        // auth router for member, admin, trainee
        this.v1Router.use("/auth", this.authRouter.router);
        // member router
        this.v1Router.use("/member", this.authChecker.memberAuthChecker, this.memberRouter.router);
        // admin router
        this.v1Router.use("/admin", this.adminRouter.router);
    }
}
exports.default = RootRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_auth_router_1 = __importDefault(require("./routers/member.auth.router"));
const express_1 = require("express");
class AuthRootRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.memberAuthRouter = new member_auth_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.use("/member", this.memberAuthRouter.router);
    }
}
exports.default = AuthRootRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_auth_router_1 = __importDefault(require("./routers/member.auth.router"));
class AuthRouter {
    constructor() {
        this.AuthRouter = (0, express_1.Router)();
        this.memberAuthRouter = new member_auth_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.AuthRouter.use("/member", this.memberAuthRouter.router);
    }
}
exports.default = AuthRouter;

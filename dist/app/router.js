"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("../appAuth/authRouter"));
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.authRouter = new authRouter_1.default();
        this.callV1Router();
    }
    callV1Router() {
        // auth router for member, admin, trainee
        this.v1Router.use("/auth", this.authRouter.AuthRouter);
    }
}
exports.default = RootRouter;

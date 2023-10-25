"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_router_1 = __importDefault(require("./routers/member.router"));
class MemberRootRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.memberRouter = new member_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.use("/", this.memberRouter.router);
    }
}
exports.default = MemberRootRouter;

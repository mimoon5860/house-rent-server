"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const admin_property_router_1 = __importDefault(require("./routers/admin.property.router"));
class AdminRootRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.adminRouter = new admin_router_1.default();
        this.adminPropertyRouter = new admin_property_router_1.default();
        this.callRouter();
    }
    callRouter() {
        // admin router
        this.router.use("/", this.adminRouter.router);
        // admin property router
        this.router.use("/property", this.adminPropertyRouter.router);
    }
}
exports.default = AdminRootRouter;

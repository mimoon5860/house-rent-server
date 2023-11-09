"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_property_router_1 = __importDefault(require("./routers/public.property.router"));
const public_otp_router_1 = __importDefault(require("./routers/public.otp.router"));
class PublicRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.propertyRouter = new public_property_router_1.default();
        this.otpRouter = new public_otp_router_1.default();
        this.callRouter();
    }
    callRouter() {
        // OTP router
        this.router.use("/otp", this.otpRouter.router);
        // property router
        this.router.use("/property", this.propertyRouter.router);
    }
}
exports.default = PublicRouter;

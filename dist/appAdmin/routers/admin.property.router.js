"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_property_controller_1 = __importDefault(require("../controllers/admin.property.controller"));
class AdminPropertyRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new admin_property_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // create property attribute router
        this.router
            .route("/basic-attribute")
            .post(this.controller.createBasicAttribute);
    }
}
exports.default = AdminPropertyRouter;

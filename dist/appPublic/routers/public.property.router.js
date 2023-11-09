"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const public_property_controller_1 = __importDefault(require("../controllers/public.property.controller"));
class PublicPropertyRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new public_property_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get property router
        this.router.route("/").get(this.controller.getProperty);
        // get single property router
        this.router.route("/:id").get(this.controller.getSingleProperty);
    }
}
exports.default = PublicPropertyRouter;

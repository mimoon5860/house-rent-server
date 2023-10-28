"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const member_controller_1 = __importDefault(require("../controllers/member.controller"));
class MemberRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new member_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get profile route
        this.router.route("/profile").get(this.controller.getProfile);
    }
}
exports.default = MemberRouter;

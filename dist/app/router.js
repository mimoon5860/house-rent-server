"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.callV1Router();
    }
    callV1Router() { }
}
exports.default = RootRouter;

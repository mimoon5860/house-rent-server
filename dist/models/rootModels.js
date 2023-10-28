"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("./userModel/userModel"));
const propertyModel_1 = __importDefault(require("./propertyModel/propertyModel"));
class Models {
    constructor(client) {
        this.client = client;
    }
    // user model
    userModel(tx) {
        return new userModel_1.default(tx || this.client);
    }
    // property model
    propertyModel(tx) {
        return new propertyModel_1.default(tx || this.client);
    }
}
exports.default = Models;

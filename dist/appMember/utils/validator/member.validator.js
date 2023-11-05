"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class MemberValidator {
    constructor() {
        this.changePassword = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
            newPassword: joi_1.default.string().required(),
        });
        this.updateProfile = joi_1.default.object({
            firstName: joi_1.default.string().optional(),
            lastName: joi_1.default.string().optional(),
            mobileNumber: joi_1.default.string().optional(),
            address: joi_1.default.string().optional(),
            areaId: joi_1.default.number().optional(),
        });
    }
}
exports.default = MemberValidator;

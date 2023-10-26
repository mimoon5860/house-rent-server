"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Login validator schema
class AuthValidator {
    constructor() {
        // login validator
        this.loginValidatorSchema = joi_1.default.object({
            email: joi_1.default.string().email().required().lowercase(),
            password: joi_1.default.string().min(8).max(20).required(),
        });
        // registration validator
        this.registrationValidatorSchema = joi_1.default.object({
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            mobileNumber: joi_1.default.string().required(),
            password: joi_1.default.string().required().min(8),
            address: joi_1.default.string().optional(),
            areaId: joi_1.default.number().optional(),
        });
    }
}
exports.default = AuthValidator;

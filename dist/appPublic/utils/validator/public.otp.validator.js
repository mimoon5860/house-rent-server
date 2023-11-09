"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class PublicOtpValidator {
    constructor() {
        // send otp body validator
        this.sendOtpSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            type: joi_1.default.string()
                .valid("Reset_Member", "Reset_Admin", "Verify_Member", "Verify_Admin")
                .required(),
        });
        // match otp body validator
        this.matchOtpSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            type: joi_1.default.string()
                .valid("Reset_Member", "Reset_Admin", "Verify_Member", "Verify_Admin")
                .required(),
            otp: joi_1.default.string().length(6).required(),
        });
    }
}
exports.default = PublicOtpValidator;

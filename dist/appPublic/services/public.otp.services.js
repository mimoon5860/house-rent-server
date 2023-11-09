"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class PublicOtpServices extends abstract_service_1.default {
    constructor() {
        super();
    }
    // send otp service
    sendEmailOtp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, type } = req.body;
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.OTP_SENT,
                data: {
                    email,
                },
            };
        });
    }
    // match otp services
    matchEmailOtp(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, type } = req.body;
        });
    }
}
exports.default = PublicOtpServices;

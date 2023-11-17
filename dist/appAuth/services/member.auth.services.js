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
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const config_1 = __importDefault(require("../../utils/config/config"));
class MemberAuthServices extends abstract_service_1.default {
    constructor() {
        super();
    }
    // register member services
    registerMember(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const userModel = this.Models.userModel(tx);
                const { email, password, firstName, lastName, mobileNumber } = req.body;
                const userMember = yield userModel.getUserMember({ email });
                if (userMember) {
                    return {
                        success: false,
                        message: "Email already exist!",
                        code: this.StatusCode.HTTP_CONFLICT,
                    };
                }
                const files = req.files || [];
                let photo = null;
                if (files.length) {
                    photo = files[0].filename;
                }
                const userName = (email.split("@")[0] + lib_1.default.otpGenNumberAndAlphabet(3)).toLocaleLowerCase();
                const hashPass = yield lib_1.default.hashPass(password);
                const newUser = yield userModel.insertUser({
                    email,
                    firstName,
                    lastName,
                    mobileNumber,
                    password: hashPass,
                    userName,
                    photo,
                });
                yield userModel.insertUserType({ userId: newUser.id });
                const newMember = yield userModel.insertMember({ userId: newUser.id });
                const tokenData = {
                    userId: newUser.id,
                    memberId: newMember.id,
                    userName,
                    email,
                    firstName,
                    lastName,
                    photo,
                };
                const token = lib_1.default.createToken(tokenData, config_1.default.JWT_SECRET_USER, "72h");
                return {
                    success: true,
                    message: "Registration successful",
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    token,
                    data: {
                        userId: newUser.id,
                        memberId: newMember.id,
                        userName,
                        email,
                        firstName,
                        lastName,
                        photo,
                        isVerified: false,
                        mobileNumber,
                        status: "Active",
                        address: null,
                        area: null,
                    },
                };
            }));
        });
    }
    // login member service
    loginMember(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userModel = this.Models.userModel();
            const member = yield userModel.getUserMember({ email });
            if (!member) {
                return {
                    success: false,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            const { user, id: memberId } = member;
            const { password: hashedPass, id: userId, firstName, lastName, photo, userName, mobileNumber, status, } = user;
            const match = yield lib_1.default.compare(password, hashedPass);
            if (!match) {
                return {
                    success: false,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            const tokenData = {
                userId,
                memberId,
                userName,
                email,
                firstName,
                lastName,
                photo,
            };
            const token = lib_1.default.createToken(tokenData, config_1.default.JWT_SECRET_USER, "72h");
            return {
                success: true,
                message: "Login successful",
                token,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                data: {
                    userId,
                    memberId,
                    userName,
                    email,
                    firstName,
                    lastName,
                    photo,
                    isVerified: false,
                    mobileNumber,
                    status,
                    address: member.address,
                    area: member.area,
                },
            };
        });
    }
}
exports.default = MemberAuthServices;

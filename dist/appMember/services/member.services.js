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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
class MemberService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get profile service
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { memberId } = req.user;
            const userModel = this.Models.userModel();
            const member = yield userModel.getUserMember({ memberId });
            if (!member) {
                return {
                    success: false,
                    message: this.ResMsg.HTTP_UNAUTHORIZED,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            const { address, area, id, user } = member;
            const { password, id: userId } = user, rest = __rest(user, ["password", "id"]);
            return {
                success: true,
                message: this.ResMsg.HTTP_OK,
                code: this.StatusCode.HTTP_OK,
                data: Object.assign({ userId, memberId: id, address,
                    area }, rest),
            };
        });
    }
    changePassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, newPassword } = req.body;
            const userModel = this.Models.userModel();
            const member = yield userModel.getUserMember({ email });
            if (!member) {
                return {
                    success: false,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            const { password: hashedPass, id } = member.user;
            const match = yield lib_1.default.compare(password, hashedPass);
            if (!match) {
                return {
                    success: false,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            const newHashedPass = yield lib_1.default.hashPass(newPassword);
            yield userModel.changePassword(newHashedPass, id);
            return {
                success: true,
                message: this.ResMsg.PASSWORD_CHANGED,
                code: this.StatusCode.HTTP_OK,
            };
        });
    }
    // update profile
    updateProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, mobileNumber, address, areaId } = req.body;
            const { memberId, userId } = req.user;
            const userModel = this.Models.userModel();
            const member = yield userModel.getUserMember({ memberId });
            if (!member) {
                return {
                    success: false,
                    message: this.ResMsg.HTTP_UNAUTHORIZED,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            const files = req.files;
            let photo = null;
            if (files.length) {
                photo = files[0].filename;
            }
            const userInfo = {
                mobileNumber,
                firstName,
                lastName,
                photo,
            };
            yield userModel.updateUser(userInfo, userId);
            yield userModel.updateMember({ address, areaId }, memberId);
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.PROFILE_UPDATED,
            };
        });
    }
    // delete profile
    deleteProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, memberId } = req.user;
            const userModel = this.Models.userModel();
            const member = yield userModel.getUserMember({ memberId });
            if (!member) {
                return {
                    success: false,
                    message: this.ResMsg.HTTP_UNAUTHORIZED,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                };
            }
            yield userModel.inActiveUser(userId);
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.PROFILE_DELETED,
            };
        });
    }
}
exports.default = MemberService;

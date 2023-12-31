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
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    constructor(client) {
        this.client = client;
    }
    // insert user
    insertUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.user.create({
                data: params,
            });
        });
    }
    // insert member
    insertMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.member.create({
                data: params,
            });
        });
    }
    // insert user type
    insertUserType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.userType.create({ data: params });
        });
    }
    // get user member
    getUserMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                user: {
                    type: {
                        some: { userType: "MEMBER" },
                    },
                },
            };
            if (params.email) {
                where.user.email = params.email;
            }
            if (params.memberId) {
                where.id = params.memberId;
            }
            if (params.userId) {
                where.user.id = params.userId;
            }
            if (params.userName) {
                where.user.userName = params.userName;
            }
            if (params.mobileNumber) {
                where.user.mobileNumber = params.mobileNumber;
            }
            if (params.status) {
                where.user.status = params.status;
            }
            if (params.userName) {
                where.user.userName = params.userName;
            }
            return yield this.client.member.findFirst({
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            isVerified: true,
                            email: true,
                            password: true,
                            userName: true,
                            firstName: true,
                            lastName: true,
                            mobileNumber: true,
                            photo: true,
                            status: true,
                            createDate: true,
                        },
                    },
                    address: true,
                    area: {
                        select: {
                            id: true,
                            name: true,
                            thana: {
                                select: {
                                    id: true,
                                    name: true,
                                    district: {
                                        select: {
                                            id: true,
                                            name: true,
                                            division: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                where,
            });
        });
    }
    // get user admin
    getUserAdmin() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // change passwoard
    changePassword(password, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.user.update({
                data: { password },
                where: { id },
            });
        });
    }
    // update user
    updateUser(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.user.update({
                data: payload,
                where: { id },
            });
        });
    }
    // update member
    updateMember(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.member.update({
                data: { address: payload.address, areaId: payload.areaId },
                where: { id },
            });
        });
    }
    // delete user
    inActiveUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.user.update({
                data: { status: "Inactive" },
                where: { id },
            });
        });
    }
}
exports.default = UserModel;

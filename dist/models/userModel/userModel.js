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
                    user: {
                        select: {
                            id: true,
                            isVerified: true,
                            email: true,
                            type: {
                                select: {
                                    id: true,
                                    userType: true,
                                },
                            },
                            userName: true,
                            firstName: true,
                            lastName: true,
                            mobileNumber: true,
                            photo: true,
                            status: true,
                            createdAt: true,
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
}
exports.default = UserModel;

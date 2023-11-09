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
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyModel {
    constructor(client) {
        this.client = client;
    }
    // insert property basic attribute
    insertBasicAttribute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return yield this.client.propertyBasicAttribute.createMany({
                    data: params,
                });
            }
            else {
                return yield this.client.propertyBasicAttribute.create({
                    data: params,
                });
            }
        });
    }
    // get property basic attributes
    getBasicAttribute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.propertyBasicAttribute.findMany({
                where: params,
            });
        });
    }
    // insert price included
    insertPriceIncluded(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return yield this.client.priceIncluded.createMany({
                    data: params,
                });
            }
            else {
                return yield this.client.priceIncluded.create({
                    data: params,
                });
            }
        });
    }
    // insert price excluded
    insertPriceExcluded(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return yield this.client.priceExcluded.createMany({
                    data: params,
                });
            }
            else {
                return yield this.client.priceExcluded.create({
                    data: params,
                });
            }
        });
    }
    // insert basic attribute values
    insertBasicAttributeValues(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return yield this.client.propertyBasicAttributeValue.createMany({
                    data: params,
                });
            }
            else {
                return yield this.client.propertyBasicAttributeValue.create({
                    data: params,
                });
            }
        });
    }
    // insert property content
    insertPropertyContent(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return yield this.client.propertyContent.createMany({
                    data: params,
                });
            }
            else {
                return yield this.client.propertyContent.create({
                    data: params,
                });
            }
        });
    }
    // insert property contact
    insertPropertyContact(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return yield this.client.propertyContact.createMany({
                    data: params,
                });
            }
            else {
                return yield this.client.propertyContact.create({
                    data: params,
                });
            }
        });
    }
    // insert property
    insertProperty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.property.create({
                data: params,
            });
        });
    }
    // get property
    getProperty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { isDeleted, title, fromDate, toDate, limit = 20, skip = 0, area, district, division, thana } = params, rest = __rest(params, ["isDeleted", "title", "fromDate", "toDate", "limit", "skip", "area", "district", "division", "thana"]);
            const where = Object.assign(Object.assign({}, rest), { isDeleted: false });
            if (isDeleted) {
                where.isDeleted = isDeleted;
            }
            if (title) {
                where.title = {
                    contains: title,
                };
            }
            if (area) {
                where.area = { name: area };
            }
            if (thana) {
                where.area = { thana: { name: thana } };
            }
            if (district) {
                where.area = { thana: { district: { name: district } } };
            }
            if (division) {
                where.area = {
                    thana: {
                        district: {
                            division: { name: division },
                        },
                    },
                };
            }
            if (fromDate && toDate) {
                const newToDate = new Date(toDate);
                newToDate.setDate(newToDate.getDate() + 1);
                where.createDate = {
                    gte: new Date(fromDate),
                    lte: newToDate,
                };
            }
            const property = yield this.client.property.findMany({
                select: {
                    id: true,
                    title: true,
                    memberId: true,
                    status: true,
                    category: true,
                    availableFrom: true,
                    shortAddress: true,
                    contents: {
                        select: {
                            id: true,
                            path: true,
                            type: true,
                        },
                    },
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
                    createDate: true,
                },
                where,
                take: limit,
                skip,
                orderBy: {
                    createDate: "desc",
                },
            });
            const total = yield this.client.property.count({ where });
            return { property, total };
        });
    }
    // check property
    checkProperty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.property.findMany({
                select: {
                    id: true,
                    title: true,
                    memberId: true,
                    status: true,
                    category: true,
                    availableFrom: true,
                    shortAddress: true,
                    contents: {
                        select: {
                            id: true,
                            path: true,
                            type: true,
                        },
                    },
                },
                where: params,
            });
        });
    }
    // get single property
    getSingleProperty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.property.findUnique({
                select: {
                    id: true,
                    memberId: true,
                    title: true,
                    summary: true,
                    availableFrom: true,
                    expiryDate: true,
                    status: true,
                    category: true,
                    price: true,
                    contact: {
                        select: {
                            id: true,
                            contact: true,
                        },
                    },
                    basicInfo: {
                        select: {
                            id: true,
                            value: true,
                            attribute: {
                                select: {
                                    attributeName: true,
                                },
                            },
                        },
                    },
                    includedPrice: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    excludedPrice: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            pirceFor: true,
                        },
                    },
                    contents: {
                        select: {
                            id: true,
                            path: true,
                            type: true,
                        },
                    },
                    shortAddress: true,
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
                    createDate: true,
                },
                where: params,
            });
        });
    }
    // update property
    updateProperty(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.property.update({
                data: payload,
                where: {
                    id,
                },
            });
        });
    }
    // update basic attribute value
    updateBasicAttributeValue(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.propertyBasicAttributeValue.update({
                data: payload,
                where: { id },
            });
        });
    }
    // delete basic attribute vlaue
    deleteBasicAttributeValue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.propertyBasicAttributeValue.deleteMany({
                where: { id },
            });
        });
    }
    // update price excluded value
    updatePriceExclue(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.priceExcluded.update({
                data: payload,
                where: { id },
            });
        });
    }
    // delete price excluded value
    deletePriceExclue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.priceExcluded.delete({
                where: { id },
            });
        });
    }
    // delete price included
    deletePriceIncluded(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.priceIncluded.delete({
                where: { id },
            });
        });
    }
}
exports.default = PropertyModel;

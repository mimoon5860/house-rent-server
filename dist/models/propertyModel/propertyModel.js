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
            return yield this.client.property.findMany({
                select: {
                    id: true,
                    title: true,
                    memberId: true,
                    status: true,
                    category: true,
                    availableFrom: true,
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
                },
                where: Object.assign(Object.assign({}, params), { isDeleted: false }),
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
}
exports.default = PropertyModel;

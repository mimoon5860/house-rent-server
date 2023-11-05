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
class MemberPropertyService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create property service
    createProperty(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const _a = req.body, { basicInfo, priceExcluded, priceIncluded } = _a, rest = __rest(_a, ["basicInfo", "priceExcluded", "priceIncluded"]);
                const { memberId } = req.user;
                const model = this.Models.propertyModel(tx);
                const newProperty = yield model.insertProperty(Object.assign(Object.assign({}, rest), { memberId }));
                const attributePayload = basicInfo.map((item) => {
                    return {
                        propertyId: newProperty.id,
                        attributeId: item.attributeId,
                        value: item.value,
                    };
                });
                yield model.insertBasicAttributeValues(attributePayload);
                if (priceIncluded.length) {
                    const includePayload = priceIncluded.map((item) => {
                        return {
                            name: item,
                            propertyId: newProperty.id,
                        };
                    });
                    yield model.insertPriceIncluded(includePayload);
                }
                if (priceExcluded.length) {
                    const excludePayload = priceExcluded.map((item) => {
                        return {
                            name: item.name,
                            price: item.price,
                            pirceFor: item.priceFor,
                            propertyId: newProperty.id,
                        };
                    });
                    yield model.insertPriceExcluded(excludePayload);
                }
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: {
                        id: newProperty.id,
                    },
                };
            }));
        });
    }
    // get property of member service
    getProperty(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, title, deleted, from_date, to_date } = req.query;
            const { memberId } = req.user;
        });
    }
    //  upload property content service
    uploadPropertyContenet(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = req.files || [];
            if (files.length > 10) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: "File upload limit is 10",
                };
            }
            const { id } = req.params;
            const { memberId } = req.user;
            const model = this.Models.propertyModel();
            const checkProperty = yield model.getProperty({
                id: parseInt(id),
                memberId,
                status: "Draft",
            });
            if (!checkProperty.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const payload = [];
            const videoMimeType = ["video/mp4", "video/mpeg"];
            files.forEach((item) => {
                if (videoMimeType.includes(item.mimetype) &&
                    item.fieldname.startsWith("video")) {
                    payload.push({
                        path: item.filename,
                        propertyId: checkProperty[0].id,
                        type: "Video",
                    });
                }
                else {
                    payload.push({
                        path: item.filename,
                        propertyId: checkProperty[0].id,
                        type: "Photo",
                    });
                }
            });
            yield model.insertPropertyContent(payload);
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.HTTP_SUCCESSFUL,
            };
        });
    }
    // update property content service
    updatePropertyContent(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = req.files || [];
            const { id } = req.params;
            const { memberId } = req.user;
            const model = this.Models.propertyModel();
            if (files.length > 10) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: "File upload limit is 10",
                };
            }
            const checkProperty = yield model.getProperty({
                id: parseInt(id),
                memberId,
                status: "Draft",
            });
            if (!checkProperty.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
        });
    }
    // update property status service
    updatePropertyStatus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { memberId } = req.user;
            const { status } = req.body;
            const model = this.Models.propertyModel();
            const checkProperty = yield model.getProperty({
                id: parseInt(id),
                memberId,
            });
            if (!checkProperty.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const currStatus = checkProperty[0].status;
            if (currStatus === "Expired") {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
            const updatePayload = { status };
            if (currStatus === "Draft") {
                const currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() + 1);
                currentDate.setDate(1);
                const formattedDate = currentDate.toISOString().slice(0, 10);
                updatePayload.expiryDate = formattedDate;
            }
            yield model.updateProperty(updatePayload, parseInt(id));
            return {
                success: true,
                message: this.ResMsg.HTTP_SUCCESSFUL,
                code: this.StatusCode.HTTP_SUCCESSFUL,
            };
        });
    }
    // get single property of member service
    getSingleProperty(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // update a property service
    updateProperty(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _a = req.body, { priceIncluded, priceExluded, basicInfo } = _a, rest = __rest(_a, ["priceIncluded", "priceExluded", "basicInfo"]);
            return yield this.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                const model = this.Models.propertyModel(tx);
                yield model.updateProperty(rest, +id);
                // balic info
                if ((_b = basicInfo === null || basicInfo === void 0 ? void 0 : basicInfo.added) === null || _b === void 0 ? void 0 : _b.length) {
                    const attributePayload = basicInfo.added.map((item) => {
                        return {
                            propertyId: parseInt(id),
                            attributeId: item.attributeId,
                            value: item.value,
                        };
                    });
                    yield model.insertBasicAttributeValues(attributePayload);
                }
                if ((_c = basicInfo === null || basicInfo === void 0 ? void 0 : basicInfo.updated) === null || _c === void 0 ? void 0 : _c.length) {
                    basicInfo.updated.map((item) => __awaiter(this, void 0, void 0, function* () {
                        yield model.updateBasicAttributeValue({ value: item.value }, item.id);
                    }));
                }
                if ((_d = basicInfo === null || basicInfo === void 0 ? void 0 : basicInfo.deleted) === null || _d === void 0 ? void 0 : _d.length) {
                    basicInfo.deleted.map((id) => __awaiter(this, void 0, void 0, function* () { return yield model.deleteBasicAttributeValue(id); }));
                }
                // Price Exluded
                if ((_e = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.added) === null || _e === void 0 ? void 0 : _e.length) {
                    const excludePayload = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.added.map((item) => {
                        return {
                            name: item.name,
                            price: item.price,
                            pirceFor: item.priceFor,
                            propertyId: parseInt(id),
                        };
                    });
                    yield model.insertPriceExcluded(excludePayload);
                }
                if ((_f = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.updated) === null || _f === void 0 ? void 0 : _f.length) {
                    (_g = priceExluded.updated) === null || _g === void 0 ? void 0 : _g.map((item) => __awaiter(this, void 0, void 0, function* () {
                        yield model.updatePriceExclue({ name: item === null || item === void 0 ? void 0 : item.name, price: item === null || item === void 0 ? void 0 : item.price, pirceFor: item === null || item === void 0 ? void 0 : item.priceFor }, item.id);
                    }));
                }
                if ((_h = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.deleted) === null || _h === void 0 ? void 0 : _h.length) {
                    (_j = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.deleted) === null || _j === void 0 ? void 0 : _j.map((id) => __awaiter(this, void 0, void 0, function* () { return yield model.deletePriceExclue(id); }));
                }
                // Price Included
                if ((_k = priceIncluded === null || priceIncluded === void 0 ? void 0 : priceIncluded.added) === null || _k === void 0 ? void 0 : _k.length) {
                    const includePayload = priceIncluded === null || priceIncluded === void 0 ? void 0 : priceIncluded.added.map((item) => {
                        return {
                            name: item,
                            propertyId: parseInt(id),
                        };
                    });
                    yield model.insertPriceIncluded(includePayload);
                }
                if ((_l = priceIncluded === null || priceIncluded === void 0 ? void 0 : priceIncluded.deleted) === null || _l === void 0 ? void 0 : _l.length) {
                    priceIncluded.deleted.map((id) => __awaiter(this, void 0, void 0, function* () { return yield model.deletePriceIncluded(id); }));
                }
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                };
            }));
        });
    }
}
exports.default = MemberPropertyService;

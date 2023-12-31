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
                const _a = req.body, { basicInfo, priceExcluded, priceIncluded, mobileNumber, alternativeMobileNumber } = _a, rest = __rest(_a, ["basicInfo", "priceExcluded", "priceIncluded", "mobileNumber", "alternativeMobileNumber"]);
                const { memberId } = req.user;
                const model = this.Models.propertyModel(tx);
                const newProperty = yield model.insertProperty(Object.assign(Object.assign({}, rest), { memberId }));
                const contactBody = [
                    { contact: mobileNumber, propertyId: newProperty.id },
                    { contact: alternativeMobileNumber, propertyId: newProperty.id },
                ];
                yield model.insertPropertyContact(contactBody);
                const attributePayload = Object.assign(Object.assign({}, basicInfo), { propertyId: newProperty.id });
                yield model.insertBasicInfo(attributePayload);
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
            const _a = req.query, { limit, skip } = _a, rest = __rest(_a, ["limit", "skip"]);
            const { memberId } = req.user;
            const filter = rest;
            filter.memberId = memberId;
            if (limit) {
                filter.limit = Number(limit);
            }
            if (skip) {
                filter.skip = Number(skip);
            }
            const model = this.Models.propertyModel();
            const propertyData = yield model.getProperty(filter);
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                total: propertyData.total,
                data: propertyData.property,
            };
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
            const checkProperty = yield model.checkProperty({
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
            if (checkProperty[0].contents.length >= 10) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_FORBIDDEN,
                    message: "Maximum 10 file is allowed for a property.",
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
            const checkProperty = yield model.checkProperty({
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
            const checkProperty = yield model.checkProperty({
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
                currentDate.setDate(currentDate.getDate());
                const formattedDate = currentDate.toISOString();
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
        return __awaiter(this, void 0, void 0, function* () {
            const { memberId } = req.user;
            const { id } = req.params;
            const model = this.Models.propertyModel();
            const property = yield model.getSingleProperty({
                id: parseInt(id),
                memberId,
            });
            if (property) {
                return {
                    success: true,
                    data: property,
                    code: this.StatusCode.HTTP_OK,
                    message: this.ResMsg.HTTP_OK,
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
        });
    }
    // update a property service
    updateProperty(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _a = req.body, { priceIncluded, priceExluded, basicInfo } = _a, rest = __rest(_a, ["priceIncluded", "priceExluded", "basicInfo"]);
            return yield this.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d, _e, _f, _g, _h;
                const model = this.Models.propertyModel(tx);
                const checkProperty = "First check the property";
                yield model.updateProperty(rest, +id);
                if (basicInfo) {
                    yield model.updateBasicInfo(basicInfo, parseInt(id));
                }
                // Price Exluded
                if ((_b = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.added) === null || _b === void 0 ? void 0 : _b.length) {
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
                if ((_c = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.updated) === null || _c === void 0 ? void 0 : _c.length) {
                    (_d = priceExluded.updated) === null || _d === void 0 ? void 0 : _d.map((item) => __awaiter(this, void 0, void 0, function* () {
                        yield model.updatePriceExclue({ name: item === null || item === void 0 ? void 0 : item.name, price: item === null || item === void 0 ? void 0 : item.price, pirceFor: item === null || item === void 0 ? void 0 : item.priceFor }, item.id);
                    }));
                }
                if ((_e = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.deleted) === null || _e === void 0 ? void 0 : _e.length) {
                    (_f = priceExluded === null || priceExluded === void 0 ? void 0 : priceExluded.deleted) === null || _f === void 0 ? void 0 : _f.map((id) => __awaiter(this, void 0, void 0, function* () { return yield model.deletePriceExclue(id); }));
                }
                // Price Included
                if ((_g = priceIncluded === null || priceIncluded === void 0 ? void 0 : priceIncluded.added) === null || _g === void 0 ? void 0 : _g.length) {
                    const includePayload = priceIncluded === null || priceIncluded === void 0 ? void 0 : priceIncluded.added.map((item) => {
                        return {
                            name: item,
                            propertyId: parseInt(id),
                        };
                    });
                    yield model.insertPriceIncluded(includePayload);
                }
                if ((_h = priceIncluded === null || priceIncluded === void 0 ? void 0 : priceIncluded.deleted) === null || _h === void 0 ? void 0 : _h.length) {
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

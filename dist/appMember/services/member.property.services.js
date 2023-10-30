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
        return __awaiter(this, void 0, void 0, function* () { });
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
            const model = this.Models.propertyModel();
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
    udpateProperty(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = MemberPropertyService;

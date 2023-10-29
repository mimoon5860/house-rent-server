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
            }));
        });
    }
    // get property of member service
    getProperty(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //  upload property content service
    uploadPropertyContenet(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // update property content service
    updatePropertyContent(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // update property status service
    updatePropertyStatus(req) {
        return __awaiter(this, void 0, void 0, function* () { });
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

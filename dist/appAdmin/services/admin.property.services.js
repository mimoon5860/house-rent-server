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
class AdminPropertyService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create property basic attribute
    createBasicAttribute(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { attributeName } = req.body;
            const model = this.Models.propertyModel();
            const checkAttribute = yield model.getBasicAttribute({ attributeName });
            if (checkAttribute.length) {
                return {
                    success: true,
                    code: this.StatusCode.HTTP_CONFLICT,
                    message: this.ResMsg.HTTP_CONFLICT,
                };
            }
            const attribute = yield model.insertBasicAttribute({ attributeName });
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.HTTP_SUCCESSFUL,
                data: attribute,
            };
        });
    }
    // get allproperty basic attribute
    getPBasicAttribute(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.Models.propertyModel();
            const attributes = yield model.getBasicAttribute({});
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                data: attributes,
            };
        });
    }
}
exports.default = AdminPropertyService;

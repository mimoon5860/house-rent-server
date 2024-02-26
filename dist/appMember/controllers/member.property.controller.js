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
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const member_property_services_1 = __importDefault(require("../services/member.property.services"));
const member_property_validator_1 = __importDefault(require("../utils/validator/member.property.validator"));
class MemberPropertyController extends abstract_controller_1.default {
    constructor() {
        super();
        this.services = new member_property_services_1.default();
        this.validator = new member_property_validator_1.default();
        // create property controller
        this.createProperty = this.asyncWrapper.wrap({ bodySchema: this.validator.createPropertySchema }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = yield this.services.createProperty(req), { code } = _a, rest = __rest(_a, ["code"]);
            res.status(code).json(rest);
        }));
        // get property controller
        this.getProperty = this.asyncWrapper.wrap({ querySchema: this.validator.getPropertyQueryValidatorSchema }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _b = yield this.services.getProperty(req), { code } = _b, rest = __rest(_b, ["code"]);
            res.status(code).json(rest);
        }));
        // upload property content controller
        this.uploadPropertyContent = this.asyncWrapper.wrap({ parmSchema: this.validator.paramsIdValidatorSchema }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _c = yield this.services.uploadPropertyContenet(req), { code } = _c, rest = __rest(_c, ["code"]);
            if (rest.success) {
                res.status(code).json(rest);
            }
            else {
                this.error(rest.message, code);
            }
        }));
        //update property content controller
        this.updatePropertyContent = this.asyncWrapper.wrap({ parmSchema: this.validator.paramsIdValidatorSchema }, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        // update property status controller
        this.updatePropertyStatus = this.asyncWrapper.wrap({
            bodySchema: this.validator.updatePropertyStatusSchmea,
            parmSchema: this.validator.paramsIdValidatorSchema,
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _d = yield this.services.updatePropertyStatus(req), { code } = _d, rest = __rest(_d, ["code"]);
            res.status(code).json(rest);
        }));
        // update property controller
        this.updateProperty = this.asyncWrapper.wrap({
            bodySchema: this.validator.updatePropertySchema,
            parmSchema: this.validator.paramsIdValidatorSchema,
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _e = yield this.services.updateProperty(req), { code } = _e, rest = __rest(_e, ["code"]);
            res.status(code).json(rest);
        }));
        // get single property controller
        this.getSingleProperty = this.asyncWrapper.wrap({ parmSchema: this.validator.paramsIdValidatorSchema }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _f = yield this.services.getSingleProperty(req), { code } = _f, rest = __rest(_f, ["code"]);
            res.status(code).json(rest);
        }));
    }
}
exports.default = MemberPropertyController;

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
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const member_property_services_1 = __importDefault(require("../services/member.property.services"));
class MemberPropertyController extends abstract_controller_1.default {
    constructor() {
        super();
        this.services = new member_property_services_1.default();
        // create property controller
        this.createProperty = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        // get property controller
        this.getProperty = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        // upload property content controller
        this.uploadPropertyContent = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        //update property content controller
        this.updatePropertyContent = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        // update property status controller
        this.updatePropertyStatus = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        // get single property controller
        this.getSingleProperty = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
        // update property controller
        this.updateProperty = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () { }));
    }
}
exports.default = MemberPropertyController;

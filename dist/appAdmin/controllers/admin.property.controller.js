"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const property_validator_1 = __importDefault(require("../utils/validator/property.validator"));
const admin_property_services_1 = __importDefault(require("../services/admin.property.services"));
class AdminPropertyController extends abstract_controller_1.default {
    constructor() {
        super();
        this.validator = new property_validator_1.default();
        this.service = new admin_property_services_1.default();
    }
}
exports.default = AdminPropertyController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class PublicPropertyValidator {
    constructor() {
        // Get property query validator schema
        this.getPropertyQueryValidatorSchema = joi_1.default.object({
            limit: joi_1.default.number().optional(),
            skip: joi_1.default.number().optional(),
            category: joi_1.default.string()
                .optional()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop"),
            area: joi_1.default.string().optional(),
            thana: joi_1.default.string().optional(),
            district: joi_1.default.string().optional(),
            division: joi_1.default.string().optional(),
            title: joi_1.default.string().optional(),
        });
        // get single property schema
        this.getSinglePropertyQuerySchema = joi_1.default.object({
            memberId: joi_1.default.number().optional(),
        });
        // id in params validator
        this.paramsIdValidatorSchema = joi_1.default.object({
            id: joi_1.default.number().required(),
        });
    }
}
exports.default = PublicPropertyValidator;

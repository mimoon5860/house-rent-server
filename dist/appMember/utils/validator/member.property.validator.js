"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class MemberPropertyValidator {
    constructor() {
        // price included schema
        this.priceIncludedSchema = joi_1.default.string().required();
        // price excluded schema
        this.priceExcludedSchema = joi_1.default.object({
            name: joi_1.default.string().required(),
            price: joi_1.default.number().required(),
            priceFor: joi_1.default.string()
                .allow(["Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly"])
                .required(),
        });
        // basic info of property schema
        this.basicInfoSchema = joi_1.default.object({
            attributeId: joi_1.default.number().required(),
            value: joi_1.default.string().required(),
        });
        // create property validator
        this.createPropertySchema = joi_1.default.object({
            title: joi_1.default.string().required(),
            shortAddress: joi_1.default.string().required(),
            summary: joi_1.default.string().required(),
            areaId: joi_1.default.number().required(),
            availableFrom: joi_1.default.date().format("YYYY-DD-MM").min("now").required(),
            price: joi_1.default.number().required(),
            priceFor: joi_1.default.string()
                .valid(["Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly"])
                .required(),
            priceIncluded: joi_1.default.array().items(this.priceIncludedSchema).allow([]),
            priceExluded: joi_1.default.array().items(this.priceExcludedSchema).allow([]),
            basicInfo: joi_1.default.array().items(this.basicInfoSchema).required(),
        });
        // save or post property schema
        this.changePropertyStatusSchema = joi_1.default.object({
            status: joi_1.default.string().allow(["Draft", "Active", "Inactive"]).required(),
        });
        // common params id check schema
        this.commonParamsIdSchema = joi_1.default.object({
            id: joi_1.default.number().integer().positive().required(),
        });
        // get property query chech schema
        this.getPropertyQeurySchema = joi_1.default.object({
            sortBy: joi_1.default.string()
                .allow(["createDate", "availableFrom", "expiryDate"])
                .optional(),
            orderBy: joi_1.default.string().allow("asc", "desc").optional(),
            status: joi_1.default.string()
                .allow("Draft", "Active", "Inactive", "Expired")
                .optional(),
            category: joi_1.default.string()
                .allow("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
                .optional(),
            area: joi_1.default.number().integer().positive().optional(),
            thana: joi_1.default.number().integer().positive().optional(),
            district: joi_1.default.number().integer().positive().optional(),
            division: joi_1.default.number().integer().positive().optional(),
        });
    }
}
exports.default = MemberPropertyValidator;

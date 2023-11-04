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
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
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
            availableFrom: joi_1.default.date().min("now").required(),
            price: joi_1.default.number().required(),
            categroy: joi_1.default.string()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
                .required(),
            priceFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .required(),
            priceIncluded: joi_1.default.array().empty().items(this.priceIncludedSchema),
            priceExluded: joi_1.default.array().empty().items(this.priceExcludedSchema),
            basicInfo: joi_1.default.array().items(this.basicInfoSchema).required(),
        });
        // save or post property schema
        this.changePropertyStatusSchema = joi_1.default.object({
            status: joi_1.default.string().valid("Active", "Inactive").required(),
        });
        // common params id check schema
        this.commonParamsIdSchema = joi_1.default.object({
            id: joi_1.default.number().integer().positive().required(),
        });
        // get property query chech schema
        this.getPropertyQeurySchema = joi_1.default.object({
            sortBy: joi_1.default.string()
                .valid("createDate", "availableFrom", "expiryDate")
                .optional(),
            orderBy: joi_1.default.string().valid("asc", "desc").optional(),
            status: joi_1.default.string()
                .valid("Draft", "Active", "Inactive", "Expired")
                .optional(),
            category: joi_1.default.string()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
                .optional(),
            area: joi_1.default.number().integer().positive().optional(),
            thana: joi_1.default.number().integer().positive().optional(),
            district: joi_1.default.number().integer().positive().optional(),
            division: joi_1.default.number().integer().positive().optional(),
        });
        this.updatePriceExludedAddedSchemah = joi_1.default.object({
            name: joi_1.default.string().optional(),
            price: joi_1.default.number().optional(),
            priceFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .optional(),
        });
        this.updatePriceExludedUpdatedSchemah = joi_1.default.object({
            id: joi_1.default.number().required,
            name: joi_1.default.string().optional(),
            price: joi_1.default.number().optional(),
            priceFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .optional(),
        });
        this.updatePropertySchemah = joi_1.default.object({
            title: joi_1.default.string().optional(),
            shortAddress: joi_1.default.string().optional(),
            summary: joi_1.default.string().optional(),
            areaId: joi_1.default.number().optional(),
            availableFrom: joi_1.default.date().min("now").optional(),
            price: joi_1.default.number().optional(),
            category: joi_1.default.string()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
                .optional(),
            priceFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .optional(),
            priceIncluded: joi_1.default.object({
                added: joi_1.default.array().items(joi_1.default.string().required()).optional(),
                deleted: joi_1.default.array().items(joi_1.default.number().required()).optional(),
            }).optional(),
            priceExluded: joi_1.default.object({
                added: joi_1.default.array().items(this.updatePriceExludedAddedSchemah).optional(),
                deleted: joi_1.default.array().items(joi_1.default.number().required()).optional(),
                updated: joi_1.default.array()
                    .items(this.updatePriceExludedUpdatedSchemah)
                    .optional(),
            }).optional(),
            basicInfo: joi_1.default.object({
                added: joi_1.default.array()
                    .items(joi_1.default.object({
                    attributeId: joi_1.default.number().required(),
                    value: joi_1.default.string().required(),
                }))
                    .optional(),
                deleted: joi_1.default.array().items(joi_1.default.number().required()).optional(),
                updated: joi_1.default.array().items(joi_1.default.object({
                    id: joi_1.default.number().required(),
                    value: joi_1.default.string().required(),
                }).optional()),
            }),
        });
    }
}
exports.default = MemberPropertyValidator;

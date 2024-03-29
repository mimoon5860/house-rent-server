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
        // create property validator
        this.createPropertySchema = joi_1.default.object({
            title: joi_1.default.string().required(),
            shortAddress: joi_1.default.string().required(),
            summary: joi_1.default.string().required(),
            areaId: joi_1.default.number().required(),
            rent: joi_1.default.number().required(),
            category: joi_1.default.string()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
                .required(),
            rentFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .required(),
            priceIncluded: joi_1.default.array().empty().items(this.priceIncludedSchema),
            priceExcluded: joi_1.default.array().empty().items(this.priceExcludedSchema),
            basicInfo: joi_1.default.object()
                .keys({
                availableFrom: joi_1.default.date().min("now").required(),
                propertyType: joi_1.default.string()
                    .valid("Room", "Flat", "Seat", "House", "Apartment", "Floor")
                    .required(),
                bedRoom: joi_1.default.number().optional(),
                bathRoom: joi_1.default.number().optional(),
                balcony: joi_1.default.number().optional(),
                floor: joi_1.default.number().optional(),
                gender: joi_1.default.string().valid("Male", "Female", "Anyone").optional(),
                size: joi_1.default.number().optional(),
                parking: joi_1.default.number().optional(),
            })
                .required(),
            mobileNumber: joi_1.default.string().required(),
            alternativeMobileNumber: joi_1.default.string().required(),
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
        // update property excluded added part validator schema
        this.updatePriceExludedAddedSchema = joi_1.default.object({
            name: joi_1.default.string().optional(),
            price: joi_1.default.number().optional(),
            priceFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .optional(),
        });
        // update property excluded updated part validator schema
        this.updatePriceExludedUpdatedSchema = joi_1.default.object({
            id: joi_1.default.number().required,
            name: joi_1.default.string().optional(),
            price: joi_1.default.number().optional(),
            priceFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .optional(),
        });
        // update property validator schema
        this.updatePropertySchema = joi_1.default.object({
            title: joi_1.default.string().optional(),
            shortAddress: joi_1.default.string().optional(),
            summary: joi_1.default.string().optional(),
            areaId: joi_1.default.number().optional(),
            availableFrom: joi_1.default.date().min("now").optional(),
            rent: joi_1.default.number().optional(),
            category: joi_1.default.string()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop")
                .optional(),
            rentFor: joi_1.default.string()
                .valid("Daily", "Weekly", "Monthly", "Half_Yearly", "Yearly")
                .optional(),
            priceIncluded: joi_1.default.object({
                added: joi_1.default.array().items(joi_1.default.string().required()).optional(),
                deleted: joi_1.default.array().items(joi_1.default.number().required()).optional(),
            }).optional(),
            priceExluded: joi_1.default.object({
                added: joi_1.default.array().items(this.updatePriceExludedAddedSchema).optional(),
                deleted: joi_1.default.array().items(joi_1.default.number().required()).optional(),
                updated: joi_1.default.array()
                    .items(this.updatePriceExludedUpdatedSchema)
                    .optional(),
            }).optional(),
            basicInfo: joi_1.default.object()
                .keys({
                availableFrom: joi_1.default.date().optional(),
                propertyType: joi_1.default.string()
                    .valid("Room", "Flat", "Seat", "House", "Apartment", "Floor")
                    .optional(),
                bedRoom: joi_1.default.number().optional(),
                bathRoom: joi_1.default.number().optional(),
                balcony: joi_1.default.number().optional(),
                floor: joi_1.default.number().optional(),
                gender: joi_1.default.string().valid("Male", "Female", "Anyone").optional(),
                size: joi_1.default.number().optional(),
                parking: joi_1.default.number().optional(),
            })
                .optional(),
        });
        // Update property status validator schema
        this.updatePropertyStatusSchmea = joi_1.default.object({
            status: joi_1.default.string().required().valid("Active", "Inactive"),
        });
        // Get property query validator schema
        this.getPropertyQueryValidatorSchema = joi_1.default.object({
            limit: joi_1.default.number().optional(),
            skip: joi_1.default.number().optional(),
            status: joi_1.default.string()
                .optional()
                .valid("Draft", "Active", "Inactive", "Expired"),
            category: joi_1.default.string()
                .optional()
                .valid("Sublet", "Bachelor", "Family", "Office", "Hostel", "Shop"),
            formDate: joi_1.default.date().optional(),
            toDate: joi_1.default.date().optional(),
            title: joi_1.default.string().optional(),
            isDeleted: joi_1.default.boolean().optional(),
        });
        // id in params validator
        this.paramsIdValidatorSchema = joi_1.default.object({
            id: joi_1.default.number().required(),
        });
    }
}
exports.default = MemberPropertyValidator;

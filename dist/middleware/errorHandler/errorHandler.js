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
const manageFile_1 = __importDefault(require("../../utils/lib/manageFile"));
const customEror_1 = __importDefault(require("../../utils/lib/customEror"));
class ErrorHandler {
    constructor() {
        /**
         * handleErrors
         */
        this.handleErrors = (err, req, res, _next) => __awaiter(this, void 0, void 0, function* () {
            // file removing starts
            const files = req.upFiles || [];
            if (files.length) {
                yield this.manageFile.deleteFromLocal(files);
            }
            console.log({ err });
            if (err instanceof customEror_1.default) {
                this.customError.message =
                    err.message || "Something went wrong, please try again later!";
                this.customError.type = err.type;
                this.customError.status = err.status;
            }
            else {
                this.customError.message =
                    "Something went wrong, please try again later!";
                this.customError.type = "Internal Server Error";
            }
            res.status(this.customError.status || 500).json(this.customError);
        });
        this.customError = {
            success: false,
            message: "Something went wrong :( please try again later!!",
            type: "Internal server error!",
        };
        this.manageFile = new manageFile_1.default();
    }
}
exports.default = ErrorHandler;

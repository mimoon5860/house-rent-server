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
const client_1 = __importDefault(require("../app/client"));
const rootModels_1 = __importDefault(require("../models/rootModels"));
const manageFile_1 = __importDefault(require("../utils/lib/manageFile"));
const responseMessage_1 = __importDefault(require("../utils/miscellaneous/responseMessage"));
const statusCode_1 = __importDefault(require("../utils/miscellaneous/statusCode"));
class AbstractServices {
    constructor() {
        this.manageFile = new manageFile_1.default();
        this.ResMsg = responseMessage_1.default;
        this.StatusCode = statusCode_1.default;
        this.prisma = client_1.default;
        this.Models = new rootModels_1.default(client_1.default);
    }
    // insert exception error
    createException(endPoint = null, exceptionText = null, errorMsg = null, lineNumber = null) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = AbstractServices;

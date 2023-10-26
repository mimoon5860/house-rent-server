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
const supertest_1 = __importDefault(require("supertest"));
const statusCode_1 = __importDefault(require("../../utils/miscellaneous/statusCode"));
const authFakeData_1 = __importDefault(require("../../utils/fakeData/authFakeData/authFakeData"));
const config_1 = __importDefault(require("../../config"));
const fake = new authFakeData_1.default();
const app = (0, config_1.default)();
// Member auth api test
describe("Member Auth Api Test", () => {
    // Member login cases
    describe("POST /api/v1/auth/member/login", () => {
        test("BEST CASE: Login successful!", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app)
                .post("/api/v1/auth/member/login")
                .send(fake.memberLoginBestCase)
                .set("Accept", "application/json")
                .expect(statusCode_1.default.HTTP_SUCCESSFUL);
        }));
        test("WORST CASE: Unprocessable Entity", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app)
                .post("/api/v1/auth/member/login")
                .send(fake.loginInvalidEntity)
                .set("Accept", "application/json")
                .expect(statusCode_1.default.HTTP_UNPROCESSABLE_ENTITY);
        }));
        test("WORST CASE: Invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app)
                .post("/api/v1/auth/member/login")
                .send(fake.loginInvalidPass)
                .set("Accept", "application/json")
                .expect(statusCode_1.default.HTTP_UNAUTHORIZED);
        }));
    });
    // Member registration cases
    describe("POST /api/v1/auth/member/register", () => {
        test("BEST CASE: Registration successful!", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app)
                .post("/api/v1/auth/member/login")
                .send(fake.memberLoginBestCase)
                .set("Accept", "application/json")
                .expect(statusCode_1.default.HTTP_SUCCESSFUL);
        }));
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthFakeData {
    constructor() {
        this.memberLoginBestCase = {
            email: "moon@gmail.com",
            password: "12345678",
        };
        this.loginInvalidPass = {
            email: "moon@gmail.com",
            password: "1234qwerqw578",
        };
        this.loginInvalidEntity = {
            password: "123456asdf78",
        };
    }
}
exports.default = AuthFakeData;

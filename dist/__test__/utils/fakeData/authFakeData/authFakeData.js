"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
class AuthFakeData {
    constructor() {
        // member login best case fake data
        this.memberLoginBestCase = {
            email: "moon@gmail.com",
            password: "12345678",
        };
        // member login invalid email pass fake data
        this.loginInvalidPass = {
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
        };
        // member login invalid entity fake data
        this.loginInvalidEntity = {
            email: faker_1.faker.person.fullName(),
            password: faker_1.faker.internet.password({ length: 4 }),
        };
        // member registration best case fake data
        this.memberRegistrationBestCase = {
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            mobileNumber: faker_1.faker.phone.number(),
            password: faker_1.faker.internet.password({ length: 10 }),
        };
    }
}
exports.default = AuthFakeData;

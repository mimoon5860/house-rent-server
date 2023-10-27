import { faker } from "@faker-js/faker";
class AuthFakeData {
  // member login best case fake data
  public memberLoginBestCase = {
    email: "moon@gmail.com",
    password: "12345678",
  };

  // member login invalid email pass fake data
  public loginInvalidPass = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  // member login invalid entity fake data
  public loginInvalidEntity = {
    email: faker.person.fullName(),
    password: faker.internet.password({ length: 4 }),
  };

  // member registration best case fake data
  public memberRegistrationBestCase = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    mobileNumber: faker.phone.number(),
    password: faker.internet.password({ length: 10 }),
  };
}

export default AuthFakeData;

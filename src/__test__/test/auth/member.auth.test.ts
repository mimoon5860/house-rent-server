import request from "supertest";
import StatusCodeTest from "../../utils/miscellaneous/statusCode";
import AuthFakeData from "../../utils/fakeData/authFakeData/authFakeData";
import getApp from "../../config";

const fake = new AuthFakeData();
const app = getApp();

// Member auth api test
describe("Member Auth Api Test", () => {
  // Member login cases
  describe("POST /api/v1/auth/member/login", () => {
    test("BEST CASE: Login successful!", async () => {
      await request(app)
        .post("/api/v1/auth/member/login")
        .send(fake.memberLoginBestCase)
        .expect(StatusCodeTest.HTTP_SUCCESSFUL);
    });

    test("WORST CASE: Unprocessable Entity", async () => {
      await request(app)
        .post("/api/v1/auth/member/login")
        .send(fake.loginInvalidEntity)
        .expect(StatusCodeTest.HTTP_UNPROCESSABLE_ENTITY);
    });

    test("WORST CASE: Invalid password", async () => {
      await request(app)
        .post("/api/v1/auth/member/login")
        .send(fake.loginInvalidPass)
        .expect(StatusCodeTest.HTTP_UNAUTHORIZED);
    });
  });

  // Member registration cases
  describe("POST /api/v1/auth/member/registration", () => {
    test("BEST CASE: Registration successful!", async () => {
      await request(app)
        .post("/api/v1/auth/member/registration")
        .field(fake.memberRegistrationBestCase)
        .attach("photo", `${__dirname}../../../..//test-assets/test.png`)
        .expect(StatusCodeTest.HTTP_SUCCESSFUL)
        .then((res) => {
          console.log(res.body);
        })
        .catch((err) => {
          console.log("this is an error: ", err);
        });
    });
  });
});

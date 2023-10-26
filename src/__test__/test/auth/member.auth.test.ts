import request from "supertest";
import app from "../../../index";
import StatusCodeTest from "../../utils/statusCode";
import AuthFakeData from "../../utils/fakeData/authFakeData/authFakeData";

const fake = new AuthFakeData();

// Member auth api test
describe("Member Auth Api Test", () => {
  describe("POST /api/v1/auth/member/login", () => {
    test("BEST CASE: Login successful!", async () => {
      await request(app)
        .post("/api/v1/auth/member/login")
        .send(fake.memberLoginBestCase)
        .set("Accept", "application/json")
        .expect(StatusCodeTest.HTTP_SUCCESSFUL);
    });

    test("WORST CASE: Unprocessable Entity", async () => {
      await request(app)
        .post("/api/v1/auth/member/login")
        .send(fake.loginInvalidEntity)
        .set("Accept", "application/json")
        .expect(StatusCodeTest.HTTP_UNPROCESSABLE_ENTITY);
    });

    test("WORST CASE: Invalid password", async () => {
      await request(app)
        .post("/api/v1/auth/member/login")
        .send(fake.loginInvalidPass)
        .set("Accept", "application/json")
        .expect(StatusCodeTest.HTTP_UNAUTHORIZED);
    });
  });
});

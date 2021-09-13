import app from "../src/app";
import supertest from "supertest";

jest.setTimeout(7000);

describe("Pug routes", () => {
  test("GET /pugs", (done) => {
    supertest(app)
      .get("/pugs")
      .expect(200)
      .expect("Content-Type",/json/)
      .then((res) => {
        expect(res.body).toStrictEqual([]);
        done();
      });
  });
});

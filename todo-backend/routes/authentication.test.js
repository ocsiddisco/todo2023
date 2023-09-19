const request = require("supertest");
const app = require("../app");

const { mongoConnect } = require("../services/mongo");

const MONGO_URL = process.env.MONGO_URL;

describe("Start API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  describe("test POST /api/auth/signup", () => {
    const userTest = {
      username: "chou",
      email: "chou",
      password: "chou",
    };

    const userTestIncorrect = {
      email: test,
      password: test,
    };

    test("It should reply with 200 success", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(userTest)
        .expect("Content-Type", /json/)
        .expect(201);
    });

    test("It should reply with 500 error", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(userTestIncorrect)
        .expect("Content-Type", /json/)
        .expect(500);
    });
  });

  describe("test POST /api/auth/signin", () => {
    const userTest = {
      username: "chou",
      email: "chou",
      password: "chou",
    };

    const userTestIncorrect = {
      username: "chou",
      email: "chouchou",
      password: "test",
    };

    test("Should return 200 success", async () => {
      const response = await request(app)
        .post("/api/auth/signin")
        .send(userTest)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    test("Should return 500 error", async () => {
      const response = await request(app)
        .post("/api/auth/signin")
        .send(userTestIncorrect)
        .expect("Content-Type", /json/)
        .expect(500);
    });
  });
});

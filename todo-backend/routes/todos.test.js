const request = require("supertest");
const app = require("../app");

const { mongoConnect } = require("../services/mongo");

const MONGO_URL = process.env.MONGO_URL;

describe("Start API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  var token = null;
  const noToken = null;
  const newTodo = "testing this";
  const userId = "65097de81e980976eb28d9c4";
  const updatedTodo = "I am testing the update";
  const todoID = 11;

  beforeEach(async () => {
    const userTest = {
      username: "chou",
      email: "chou",
      password: "chou",
    };

    const response = await request(app).post("/api/auth/signin").send(userTest);
    token = response.body.token;
  });

  describe("test todo end points for user: chou", () => {
    // --- GET TODOS ---

    test("GET TODOS - expect 200 success", async () => {
      const response = await request(app)
        .get("/todos")
        .set("Authorization", "Bearer " + token)
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(200);
    });

    test("GET TODOS - expect 500 error", async () => {
      const response = await request(app)
        .get("/todos")
        .set("Authorization", "Bearer " + noToken)
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(500);
    });

    // --- POST TODO ---

    test("POST TODO - expect 201 success", async () => {
      const response = await request(app)
        .post("/todos")
        .set("Authorization", "Bearer " + token)
        .send(newTodo)
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(201);
    });
    test("POST TODO - expect 500 error", async () => {
      const response = await request(app)
        .post("/todos")
        .set("Authorization", "Bearer " + noToken)
        .send(newTodo)
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(500);
    });

    // --- UPDATE TODO ---

    test("PUT TODO - expect 200 success", async () => {
      const response = await request(app)
        .put("/todos")
        .set("Authorization", "Bearer " + token)
        .send({ userId: userId, updatedTodo: updatedTodo, todoID: todoID })
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(200);
    });
    test("PUT TODO - expect 500 error", async () => {
      const response = await request(app)
        .put("/todos")
        .set("Authorization", "Bearer " + noToken)
        .send({ updatedTodo: updatedTodo, todoID: todoID })
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(500);
    });

    // --- DELETE TODO ---

    test("DELETE TODO - expect 200 success", async () => {
      const response = await request(app)
        .delete("/todos")
        .set("Authorization", "Bearer " + token)
        .send({ todoID: todoID })
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(200);
    });

    test("DELETE TODO - expect 500 error", async () => {
      const response = await request(app)
        .put("/todos")
        .set("Authorization", "Bearer " + noToken)
        .send({ todoID: null })
        .expect("Content-Type", /json/);

      expect(response.statusCode).toBe(500);
    });
  });
});

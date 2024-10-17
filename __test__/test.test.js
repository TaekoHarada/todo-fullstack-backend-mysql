import request from "supertest";
import { expect } from "chai"; // Chai for assertions
import app from "../app.js"; // Adjust the path to your app

describe("Todos API", () => {
  // this ID is created by the POST test, then used by the PUT and DELETE tests
  let newId = "";

  // Test GET /api/todos
  describe("GET /api/todos", () => {
    it("should return all todos", async () => {
      const response = await request(app).get("/api/todos");

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");

      if (response.body.length > 0) {
        expect(response.body[0]).to.have.property("id");
        expect(response.body[0]).to.have.property("title");
        expect(response.body[0]).to.have.property("completed");
      }
    });
  });

  // Test POST /api/todos
  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = { title: "New Todo", completed: false };
      const response = await request(app).post("/api/todos").send(newTodo); // Send new todo data

      expect(response.status).to.equal(201); // Expect status for created resource
      expect(response.body).to.have.property("id");
      newId = response.body.id; // Save the new ID for future tests
      expect(response.body.title).to.equal(newTodo.title);
      expect(response.body.completed).to.equal(newTodo.completed);
    });
  });

  // Test PUT /api/todos/:id
  describe("PUT /api/todos/:id", () => {
    it("should update a todo by id", async () => {
      const updatedTodo = { title: "Updated Todo", completed: true };

      const response = await request(app)
        .put(`/api/todos/${newId}`)
        .send(updatedTodo); // Send updated todo data

      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal(updatedTodo.title);
      expect(response.body.completed).to.equal(updatedTodo.completed);
    });
  });

  // Test DELETE /api/todos/:id
  describe("DELETE /api/todos/:id", () => {
    it("should delete a todo by id", async () => {
      const response = await request(app).delete(`/api/todos/${newId}`);

      expect(response.status).to.equal(200); // Expect status for successful deletion
      expect(response.body.message).to.equal("Todo deleted successfully");
    });
  });
});

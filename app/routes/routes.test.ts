import request from "supertest";

import { app } from "..";
import { sequelize } from "../data-access/db";

let userId: string;
let token: string;

beforeAll(async() => {
  await sequelize.sync({ force: true });

  const login = "test@domain.com";
  const password = "123_abc";

  const { body: { id }} = await request(app)
    .post("/user")
    .send({
      login,
      password,
    });

  userId = id; 

  const res = await request(app)
    .post("/login")
    .send({
      login,
      password,
    });

  token = res.body.token;
});

afterAll(async() => {
  await sequelize.close();
});

describe("User API", () => {
  const login = "test1@domain.com";

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/user")
      .send({
        login,
        password: "123_abc",
      });

    expect(res.status).toEqual(200);
  });

  it("should not create a user with the same login", async () => {
    const res = await request(app)
      .post('/user')
      .send({
        login,
        password: "123_abc",
      });

    expect(res.status).toEqual(400);
  });

  it("should not create a user with incorrect login", async () => {
    const res = await request(app)
      .post('/user')
      .send({
        login: "test",
        password: "123_abc",
      });

    expect(res.status).toEqual(400);
  });

  it("should not create a user with incorrect password", async () => {
    const res = await request(app)
      .post('/user')
      .send({
        login: "test2@domain.com",
        password: "123",
      });

    expect(res.status).toEqual(400);
  });

  it("should get user", async () => {
    const res = await request(app)
      .get(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body.login).toEqual("test@domain.com");
  });

  it("should get all users", async() => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it("should get limited count of users", async() => {
    const res = await request(app)
      .get("/users?limit=1")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it("should get users by login substring", async() => {
    const res = await request(app)
      .get("/users?loginSubstring=test1")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it("should update user", async () => {
    const res = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        login: "test_new@domain.com",
        age: 20,
      });
    
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([userId]);
  });

  it("should delete user", async () => {
    const res = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(userId);
  });
});

describe("Group API", () => {
  const groupName = "group1";
  let groupId: string;

  it("should create a new group", async () => {
    const res = await request(app)
      .post("/group")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: groupName,
        permissions: ["READ", "WRITE"],
      });

    expect(res.status).toEqual(200);

    groupId = res.body.id;
  });

  it("should get group", async () => {
    const res = await request(app)
      .get(`/group/${groupId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(groupName);
  });

  it("should get all groups", async() => {
    const res = await request(app)
      .get("/groups")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it("should update group", async () => {
    const res = await request(app)
      .put(`/group/${groupId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "group2",
        permissions: ["READ", "WRITE", "SHARE"],
      });

    expect(res.status).toEqual(200);
    expect(res.body).toEqual([groupId]);
  });

  it ("should add user to group", async () => {
    const res = await request(app)
      .post("/group/addUsers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        groupId: groupId,
        userIds: [userId],
      });

    expect(res.status).toEqual(200);
  });

  it("should delete group", async () => {
    const res = await request(app)
      .delete(`/group/${groupId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(userId);
  });
});

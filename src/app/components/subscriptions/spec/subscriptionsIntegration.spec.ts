process.env.DATABASE_NAME = "pangaea_test";

import app from "../../../app";
import request from "supertest";
import { subscriptionMockPayloads } from "./subscriptionsMockData";
import { db } from "../../../database";

beforeAll(async () => {
  await db.migrate.latest({ directory: "./src/app/database/migrations" });
});

afterAll(async () => {
  //clear data in tables
  await db("subscriptions").truncate();
  await db("messages").truncate();
});

describe("#Create subscription", () => {
  it("should create a subscription successfully", async () => {
    const payload = subscriptionMockPayloads.create;
    const topic = subscriptionMockPayloads.topic;
    const res = await request(app).post(`/subscribe/${topic}`).send(payload);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("url");
    expect(res.body.url).toEqual(payload.url);
  });

  it("should throw error if subscription already exists", async () => {
    const payload = subscriptionMockPayloads.create;
    const topic = subscriptionMockPayloads.topic;
    const res = await request(app).post(`/subscribe/${topic}`).send(payload);

    expect(res.body.success).toBeFalsy();
    expect(res.body.message).toEqual("Url passed, already subscribed to topic");
  });
});

describe("#Publish to topic", () => {
  it("should publish to topic successfully", async () => {
    const payload = subscriptionMockPayloads.publish;
    const topic = subscriptionMockPayloads.topic;
    const res = await request(app).post(`/publish/${topic}`).send(payload);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

import { BaseModel } from "./BaseModel";

export class Subscription extends BaseModel {
  static tableName = "subscriptions";

  readonly id?: number;
  topic: string;
  url: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["topic", "url"],
      properties: {
        id: { type: "number" },
        topic: { type: "string" },
        url: { type: "string" },
      },
    };
  }
}

import { BaseModel } from "./BaseModel";

export class Message extends BaseModel {
  static tableName = "messages";

  readonly id?: number;
  topic: string;
  url: string;
  data: Record<string, any>;
  response: any;
  is_acknowledged: boolean;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["topic", "url", "data"],
      properties: {
        id: { type: "number" },
        topic: { type: "string" },
        url: { type: "string" },
        data: { type: "object" },
        is_acknowledged: { type: "boolean" },
      },
    };
  }
  static get jsonAttributes() {
    return ["data"];
  }
}

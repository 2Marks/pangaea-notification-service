import { Message, Subscription } from "../../database/models";
import {
  CreateMessageDTO,
  CreateSubscriptionDTO,
} from "./subscriptionsInterface";

export class SubScriptionRepository {
  static async create(params: CreateSubscriptionDTO) {
    return await Subscription.query().insert({
      topic: params.topic,
      url: params.url,
    });
  }

  static async getOneByTopicUrl(topic: string, url: string) {
    return await Subscription.query()
      .where("topic", topic)
      .andWhere("url", url)
      .select(["topic", "url"])
      .first();
  }

  static async getSubscribersByTopic(topic: string) {
    return await Subscription.query()
      .where("topic", topic)
      .select(["topic", "url"]);
  }

  static async createMessage(params: CreateMessageDTO) {
    return await Message.query().insert(params);
  }

  static async getPendingMessages() {
    return await Message.query().where("is_acknowledged", false);
  }

  static async markMessageAsSent(id: number) {
    return await Message.query()
      .where("id", id)
      .patch({ is_acknowledged: true });
  }
}

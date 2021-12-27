import { httpService, isNotLengthy, logger } from "../../helpers";
import { ResourceExistError } from "../../helpers/errors";
import {
  CreateSubscriptionDTO,
  PusblishMessageDTO,
} from "./subscriptionsInterface";
import { SubScriptionRepository } from "./subscriptionsRepository";

export class SubscriptionService {
  static async create(params: CreateSubscriptionDTO) {
    const isExist = await SubScriptionRepository.getOneByTopicUrl(
      params.topic,
      params.url
    );
    if (isExist) {
      throw new ResourceExistError({
        message: "Url passed, already subscribed to topic",
      });
    }

    return await SubScriptionRepository.create(params);
  }

  static async publish(params: PusblishMessageDTO) {
    const subscribers = await SubScriptionRepository.getSubscribersByTopic(
      params.topic
    );
    if (isNotLengthy(subscribers)) {
      return params;
    }

    const events = subscribers.map((subscriber) =>
      this.publishMessage(subscriber.url, params)
    );
    await Promise.all(events);

    return params;
  }

  private static async publishMessage(url: string, params: PusblishMessageDTO) {
    try {
      await httpService.post({ url, data: params.data });
    } catch (error) {
      await SubScriptionRepository.createMessage({
        url,
        topic: params.topic,
        data: params.data,
        response: error.message,
        is_acknowledged: false,
      });
    }

    return true;
  }

  static async resendPendingMessages() {
    const pendingMessages = await SubScriptionRepository.getPendingMessages();
    if (isNotLengthy(pendingMessages)) {
      return true;
    }

    const events = pendingMessages.map((message) => {
      const fn = async () => {
        try {
          await httpService.post({ url: message.url, data: message.data });
          await SubScriptionRepository.markMessageAsSent(message.id as number);
        } catch (error) {
          logger.error(error);
        }
        return true;
      };

      return fn();
    });

    await Promise.all(events);

    return true;
  }
}

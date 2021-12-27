import { validate } from "../../helpers";
import { SubscriptionService } from "./subscriptionService";
import {
  CreateSubscriptionDTO,
  PusblishMessageDTO,
} from "./subscriptionsInterface";
import {
  createSubscriptionSchema,
  publishMessageSchema,
} from "./subscriptionsSchema";

export class SubscriptionController {
  static async create(params: CreateSubscriptionDTO) {
    const value = validate(params, createSubscriptionSchema);
    const data = await SubscriptionService.create(value);

    return {
      data,
      message: "subscription created successfully",
    };
  }

  static async publish(params: PusblishMessageDTO) {
    const value = validate(params, publishMessageSchema);
    const data = await SubscriptionService.publish(value);

    return {
      data,
      message: "messages pusblished successfully",
    };
  }

  static async resendPendingMessages() {
    const data = await SubscriptionService.resendPendingMessages();

    return {
      data,
      message: "messages resent successfully",
    };
  }
}

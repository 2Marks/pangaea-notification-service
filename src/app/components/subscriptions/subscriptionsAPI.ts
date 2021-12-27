import { APIHelper, APIRouter } from "../../helpers";
import { SubscriptionController } from "./subscriptionsController";

const router = APIRouter();

router.post("/subscribe/:topic", (req, res) =>
  APIHelper({ req, res, controller: SubscriptionController.create })
);

router.post("/publish/:topic", (req, res) =>
  APIHelper({ req, res, controller: SubscriptionController.publish })
);

router.post("/resend", (req, res) =>
  APIHelper({
    req,
    res,
    controller: SubscriptionController.resendPendingMessages,
    expectPayload: false,
  })
);

export const subscriptionsAPI = router;

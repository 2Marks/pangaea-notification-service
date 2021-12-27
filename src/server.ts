import * as http from "http";
import { env, logger } from "./app/helpers";
import App from "./app";
import SubscriberApp from "./subscriberApp/app";

//app server
const server = http.createServer(App);
const APP_PORT = env.get("APP_PORT") || 8000;

server.listen(APP_PORT, async () => {
  logger.info(
    `NOTIFICIATION SERVER STARTED SUCCESSFULLY ON PORT ${APP_PORT} ✅`
  );
});

//subscriber server
const subscriberServer = http.createServer(SubscriberApp);
const SUBSCRIBER_APP_PORT = 9000;

subscriberServer.listen(SUBSCRIBER_APP_PORT, async () => {
  logger.info(
    `SUBSCRIBER SERVER STARTED SUCCESSFULLY ON PORT ${SUBSCRIBER_APP_PORT} ✅`
  );
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
  logger.error("error occured");
});

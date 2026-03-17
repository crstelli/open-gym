import { app } from "./app.js";
import { SERVER_PORT } from "@config/dot-env.js";

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught Exception: Shutting the server down...");
  console.log(err.name, err.message);

  process.exit(1);
});

async function startServer() {
  if (!SERVER_PORT) {
    console.error("SERVER_PORT is not defined in the environment variables.");
    process.exit(1);
  }

  const server = app.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}.`);
  });

  process.on("unhandledRejection", (err: Error) => {
    console.log("Unhandled Rejection: Shutting the server down...");
    console.log(err.name, err.message);

    server.close(() => process.exit(1));
  });
}

startServer();

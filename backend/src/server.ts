import "./config/load-dotenv.js";

import { app } from "./app.js";

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught Exception: Shutting the server down...");
  console.log(err.name, err.message);

  process.exit(1);
});

async function startServer() {
  const port = process.env.SERVER_PORT;

  if (!port) {
    console.error("SERVER_PORT is not defined in the environment variables.");
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  });

  process.on("unhandledRejection", (err: Error) => {
    console.log("Unhandled Rejection: Shutting the server down...");
    console.log(err.name, err.message);

    server.close(() => process.exit(1));
  });
}

startServer();

import 'tsconfig-paths/register'; 

import http from "http";
import app from "./app"; // Import the configured app
import { ENV } from "@config/env"; // Load environment variables

const PORT = ENV.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => process.exit(0));
});

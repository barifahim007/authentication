import mongoose from "mongoose";
import app from "./app";
import config from "./config";

import { Server } from "http";
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("yeahhoo! databse connected");
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error, "oh noo!!! database not connected");
  }
}

main();

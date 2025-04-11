import bodyParser from "body-parser";
import express from "express";

import { connection } from "./config/database.config";
import { ENV } from "./config/env";

connection() // CONNECT MONGOOSE DB

const app = express();
const PORT = ENV.PORT;

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})


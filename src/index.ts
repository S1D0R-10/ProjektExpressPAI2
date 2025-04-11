import bodyParser from "body-parser";
import express from "express";

import { connection } from "@config/database";
import { ENV } from "@config/env";

import { tableController } from "@tables/tables.controller";
import { reservationController } from "@reservations/reservations.controller";
import { menuController } from "@menu/menu.controller";
import { orderController } from "@orders/orders.controller";

connection(); // CONNECT MONGOOSE DB

const app = express();
const PORT = ENV.PORT;

app.use(bodyParser.json());

app.use("/tables", tableController);
app.use("/menu", menuController);
app.use("/reservations", reservationController);
app.use("/orders", orderController);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

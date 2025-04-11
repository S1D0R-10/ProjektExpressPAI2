import bodyParser from "body-parser";
import express from "express";

import { connection } from "./config/database.config";
import { ENV } from "./config/env";

import { tableController } from "./resources/tables/table.controller";
import { reservationController } from "./resources/reservations/reservation.controller";
import { menuController } from "./resources/menu/menu.controller";
import { orderController } from "./resources/orders/order.controller";

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

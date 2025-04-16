import type { Request, Response, NextFunction } from "express";

import { OrderStatus } from "@orders/orders.dto";

export const SetDefaultStatus =
    (status: OrderStatus) =>
    (request: Request, _: Response, next: NextFunction) => {
        request.body.status = status;
        next();
    };

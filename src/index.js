import dotenv from "dotenv";
dotenv.config();
import express, {} from "express";
import authRouter from "./routes/auth/routes.post.auth.js";
import productsPostRouter from "./routes/products/routers.post.products.js";
import productsGetRouter from "./routes/products/routers.get.products.js";
import htmlRouter from "./routes/routes.get.html.js";
import logsRouter from "./routes/routes.get.logs.js";
import cartPostRouter from "./routes/cart/routers.post.cart.js";
import orderPostRouter from "./routes/orders/routers.post.orders.js";
import orderGetRouter from "./routes/orders/routers.get.orders.js";
import npGetRouter from "./routes/orders/routers.get.novaposhta.js";
import paymentPostRouter from "./routes/orders/routers.post.payment.js";
import userGetRouter from "./routes/user/router.get.user.js";
import userPostRouter from "./routes/user/router.post.user.js";
import rewieGetRouter from "./routes/rewie/routers.get.rewie.js";
import rewiePostRouter from "./routes/rewie/routers.post.rewie.js";
import wishlistGetRouter from "./routes/wishlist/routers.get.wishlist.js";
import wishlistPostRouter from "./routes/wishlist/routers.post.wishlist.js";
import wishlistDeleteRouter from "./routes/wishlist/routers.delete.wishlist.js";
import { createTableUsers } from "./db/auth/db.createTable.js";
import { deleteAll, deleteUser, getUsers } from "./db/auth/db.dao.js";
import cookieParser from "cookie-parser";
import { dateExpire, sendlerEmailCode } from "./utils/utils.js";
import { createTables } from "./db/products/db.createTable.js";
import { deleteOrder } from "./db/order/db.dao.js";
import { createTableRewies } from "./db/rewies/db.createtable.js";
import { createTableWishlist } from "./db/wishlist/db.createTebale.js";
import { CreatePaymentTable } from "./db/payment/db.createTable.js";
import { errorHandler } from "./cfg/logs/handlerExpress.js";
import morgan from "morgan";
import { log, logError } from "./cfg/logs/logger.js";
import { logsCfg } from "./cfg/logs/appLogs.js";
const app = express();
const port = process.env.PORT || 3000;
process.on("unhandledRejection", (reason) => logError(reason));
process.on("uncaughtException", (err) => {
    logError(err);
    process.exit(1);
});
const run = async () => {
    await createTableUsers();
    await createTables();
    await createTableRewies();
    await createTableWishlist();
    await CreatePaymentTable();
    const jsonBodyModdleweare = express.json();
    app.use(jsonBodyModdleweare);
    app.use(cookieParser());
    logsCfg(app); // Логи сеервер
    app.use("/", htmlRouter);
    app.use("/", logsRouter);
    app.use('/', authRouter);
    app.use('/', productsPostRouter);
    app.use('/', productsGetRouter);
    app.use('/', cartPostRouter);
    app.use('/', orderPostRouter);
    app.use('/', orderGetRouter);
    app.use('/', npGetRouter);
    app.use('/', paymentPostRouter);
    app.use('/', userGetRouter);
    app.use('/', userPostRouter);
    app.use('/', rewieGetRouter);
    app.use('/', rewiePostRouter);
    app.use('/', wishlistGetRouter);
    app.use('/', wishlistPostRouter);
    app.use('/', wishlistDeleteRouter);
    app.use(errorHandler); // В конце всех роутов
    app.get('/', async (req, res) => {
        // deleteAll()  
        // deleteOrder()
        // updateRating(3)
        const data = await getUsers();
        res.send(data);
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
run();
//# sourceMappingURL=index.js.map
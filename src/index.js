import express, {} from "express";
import authRouter from "./routes/routes.post.auth.js";
import htmlRouter from "./routes/routes.get.html.js";
import { createTableUsers } from "./db/db.createTable.js";
import { deleteAll, deleteUser, getUsers } from "./db/db.repository.js";
import cookieParser from "cookie-parser";
import { sendlerEmailCode } from "./utils/utils.js";
const app = express();
const port = 3000;
const run = async () => {
    await createTableUsers();
    const jsonBodyModdleweare = express.json();
    app.use(jsonBodyModdleweare);
    app.use(cookieParser());
    app.use("/", htmlRouter);
    app.use('/', authRouter);
    app.get('/', async (req, res) => {
        // deleteAll()
        const data = await getUsers();
        res.send(data);
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
run();
//# sourceMappingURL=index.js.map
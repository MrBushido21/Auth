import dotenv from "dotenv"
dotenv.config()
import express, { type Request, type Response } from "express";
import authRouter from "./routes/auth/routes.post.auth.js"
import productsPostRouter from "./routes/products/routers.post.products.js"
import productsGetRouter from "./routes/products/routers.get.products.js"
import htmlRouter from "./routes/routes.get.html.js"
import cartDeleteRouter from "./routes/cart/routers.delete.cart.js"
import cartPostRouter from "./routes/cart/routers.post.cart.js"
import cartGetRouter from "./routes/cart/routers.get.cart.js"
import orderPostRouter from "./routes/orders/routers.post.orders.js"
import { createTableUsers } from "./db/auth/db.createTable.js";
import { deleteAll, deleteUser, getUsers } from "./db/auth/db.dao.js";
import cookieParser from "cookie-parser";
import { dateExpire, sendlerEmailCode } from "./utils/utils.js";
import { createTables } from "./db/products/db.createTable.js";
import { deleteOrder } from "./db/order/db.dao.js";


const app = express();
const port = process.env.PORT || 3000;

const run = async () => {
await createTableUsers()
await createTables()

const jsonBodyModdleweare = express.json()
app.use(jsonBodyModdleweare)
app.use(cookieParser());
app.use("/", htmlRouter);

app.use('/', authRouter)
app.use('/', productsPostRouter)
app.use('/', productsGetRouter)
app.use('/', cartDeleteRouter)
app.use('/', cartPostRouter)
app.use('/', cartGetRouter)
app.use('/', orderPostRouter)

app.get('/', async (req, res) => {
  // deleteAll()  
  // deleteOrder()
  const data = await getUsers() 
  res.send(data)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
}

run()
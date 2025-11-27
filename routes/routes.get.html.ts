import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../db/products/db.dao.js";

const router = Router()
router.get("/login", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: "./pages" });
});
router.get("/admin/createitems", (req: Request, res: Response) => {
    res.sendFile("admin-createitems.html", { root: "./pages" });
});
router.get("/admin/orders", (req: Request, res: Response) => {
    res.sendFile("admin-orders.html", { root: "./pages" });
});
router.get("/books", (req: Request, res: Response) => {
    res.sendFile("book.html", { root: "./pages" });
});
router.get("/refresh", (req: Request, res: Response) => {
    res.sendFile("refresh.html", { root: "./pages" });
});
router.get("/getproducts", async (req: Request, res: Response) => {
    res.sendFile("products.html", { root: "./pages" });
});
router.get("/cart", async (req: Request, res: Response) => {
    res.sendFile("cart.html", { root: "./pages" });
});
router.get("/order", async (req: Request, res: Response) => {
    res.sendFile("order.html", { root: "./pages" });
});

export default router
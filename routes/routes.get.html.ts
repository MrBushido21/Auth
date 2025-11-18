import { Router, type Request, type Response } from "express";
import { getAllProducts } from "../db/service/db.dao.js";

const router = Router()
router.get("/login", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: "./pages" });
});
router.get("/admin", (req: Request, res: Response) => {
    res.sendFile("admin.html", { root: "./pages" });
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

export default router
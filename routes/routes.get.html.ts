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
router.get("/admin/fullorder", (req: Request, res: Response) => {
    res.sendFile("admin-fullorder.html", { root: "./pages" });
});
router.get("/admin/redactor", (req: Request, res: Response) => {
    res.sendFile("admin-redactor.html", { root: "./pages" });
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
router.get("/product", async (req: Request, res: Response) => {
    res.sendFile("productPage.html", { root: "./pages" });
});
router.get("/cart", async (req: Request, res: Response) => {
    res.sendFile("cart.html", { root: "./pages" });
});
router.get("/order", async (req: Request, res: Response) => {
    res.sendFile("order.html", { root: "./pages" });
});
router.get("/user", async (req: Request, res: Response) => {
    res.sendFile("user.html", { root: "./pages" });
});
router.get("/changepasswordform", async (req: Request, res: Response) => {
    res.sendFile("changepassword.html", { root: "./pages" });
});
router.get("/changeemailform", async (req: Request, res: Response) => {
    res.sendFile("changeemail.html", { root: "./pages" });
});

export default router
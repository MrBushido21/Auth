import { Router } from "express";
import { getAllProducts } from "../db/products/db.dao.js";
const router = Router();
router.get("/login", (req, res) => {
    res.sendFile("index.html", { root: "./pages" });
});
router.get("/admin/createitems", (req, res) => {
    res.sendFile("admin-createitems.html", { root: "./pages" });
});
router.get("/admin/orders", (req, res) => {
    res.sendFile("admin-orders.html", { root: "./pages" });
});
router.get("/admin/redactor", (req, res) => {
    res.sendFile("admin-redactor.html", { root: "./pages" });
});
router.get("/books", (req, res) => {
    res.sendFile("book.html", { root: "./pages" });
});
router.get("/refresh", (req, res) => {
    res.sendFile("refresh.html", { root: "./pages" });
});
router.get("/getproducts", async (req, res) => {
    res.sendFile("products.html", { root: "./pages" });
});
router.get("/cart", async (req, res) => {
    res.sendFile("cart.html", { root: "./pages" });
});
router.get("/order", async (req, res) => {
    res.sendFile("order.html", { root: "./pages" });
});
export default router;
//# sourceMappingURL=routes.get.html.js.map
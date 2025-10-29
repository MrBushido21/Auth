import { Router } from "express";
const router = Router();
router.get("/login", (req, res) => {
    res.sendFile("index.html", { root: "./pages" });
});
router.get("/admin", (req, res) => {
    res.sendFile("admin.html", { root: "./pages" });
});
router.get("/books", (req, res) => {
    res.sendFile("book.html", { root: "./pages" });
});
router.get("/refresh", (req, res) => {
    res.sendFile("refresh.html", { root: "./pages" });
});
export default router;
//# sourceMappingURL=routes.get.html.js.map
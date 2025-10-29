import { Router, type Request, type Response } from "express";

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

export default router
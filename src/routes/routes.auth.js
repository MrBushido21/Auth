import { Router } from "express";
import { auth } from "../utils/utils.login.js";
const router = Router();
let users = [];
// регистрация
router.post("/registration", (req, res) => {
    const newUser = {
        id: users.length + 1, // динамический id
        username: req.body.username,
        password: req.body.password
    };
    users.push(newUser);
    return res.json(users);
});
// логин
router.post("/login", (req, res) => {
    if (auth(req.body.username, req.body.password)) {
        return res.json({ status: "Ok" });
    }
    else {
        return res.json({ status: "Not Ok" });
    }
});
export default router;
//# sourceMappingURL=routes.auth.js.map
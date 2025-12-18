import { Router } from "express"
import { checkAuth } from "../../middleware/middleware.auth.js"
import { middlewareMulter } from "../products/routers.post.products.js"
import { convertImg } from "../../services/image/image.services.js"
import User from "../../services/user/servicesClassUser.js"
import { chekUser } from "../../utils/utils.js"

const router = Router()

router.post('/user/avatar', checkAuth, middlewareMulter.single('avatar'), async (req, res) => {
 
   const user_id = chekUser(req)
    const img = await convertImg(req.file?.path);
    
    if (user_id && img) {
        try {
            const userClass = new User(user_id)
            await userClass.updateAvatar(img.url, img.public_id)            
            return res.status(200).json({message: "avatar upload"})
            
        } catch (error) {
            
        }
    }
})
export default router
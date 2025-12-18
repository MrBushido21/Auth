import cloudinary from "../../cfg/cloudinary.js"
import { userRepository } from "../../db/user/userRepository.js"

class User {
    id: number
    constructor(id: number) {
        this.id = id
    }

    async getUser() {
        const user = await userRepository.getUser(this.id)
        return user
    }

    async updateAvatar(img: string, public_id: string) {
        const user = await this.getUser()
        if (user.avatar) {
            try {
                await cloudinary.uploader.destroy(user.public_id);
            } catch (error) {
                console.error(error);
            }

        }
        try {
            await userRepository.updataAvatar(this.id, img, public_id)
        } catch (error) {
            console.error(error);

        }
    }
}

export default User
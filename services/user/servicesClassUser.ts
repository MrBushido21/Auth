import { userRepository } from "../../db/user/userRepository.js"

class User {
    id:number
    constructor(id:number) {
        this.id = id 
    }

    async getUser() {
        const user = await userRepository.getUser(this.id)
        return user
    }
}

export default User
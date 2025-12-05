import { rewiesRepository } from "../../db/rewies/rewiesRepository.js"
import { dateNow } from "../../utils/utils.js"

export const servicesRewie = {
    async create({product_id, user_id, comment, advantage, flaws, rating}: 
        {product_id:number, user_id:number, comment:string, advantage:string, flaws:string, rating:number}) {
        
        await rewiesRepository.createrRewies(product_id, user_id, comment, advantage, flaws, rating, dateNow())
    }
}
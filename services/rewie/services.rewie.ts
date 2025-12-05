import { rewiesRepository } from "../../db/rewies/rewiesRepository.js"
import { dateNow } from "../../utils/utils.js"

export const servicesRewie = {
    async create({product_id, user_id, user_name, comment, advantage, flaws, rating}: 
        {product_id:number, user_id:number, user_name:string, comment:string, advantage:string, flaws:string, rating:number}) {
        
        try {
            await rewiesRepository.createrRewies(product_id, user_id, user_name, comment, advantage, flaws, rating, dateNow())
        } catch (error) {
            console.error(error);
            
        }
    }, 

    async getRewies({product_id}: {product_id:number}) {
        try {
            const rewies = await rewiesRepository.getRewies(product_id)
            return rewies
        } catch (error) {
            console.error(error);          
        }
    }
}
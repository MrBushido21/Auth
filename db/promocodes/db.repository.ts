import * as promo from "./db.dao.js"

export const promocodeRepository = {
    create: promo.createPromocode,
    findByCode: promo.findPromocodeByCode,
    deactivate: promo.deactivatePromocode,  
    getAllPromocodes: promo.getAllPromocodes
}
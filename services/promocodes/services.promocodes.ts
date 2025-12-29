import { promocodeRepository } from "../../db/promocodes/db.repository.js"

export const servicesPromocodes = {
    async createPromocode(code: string, discountPercent: number) {
        return await promocodeRepository.create(code, discountPercent)
    },

    async findPromocodeByCode(code: string) {
        return await promocodeRepository.findByCode(code)
    },

    async deactivatePromocode(code: string) {
        return await promocodeRepository.deactivate(code)
    },
    async getAllPromocodes() {
        return await promocodeRepository.getAllPromocodes()
    }
}
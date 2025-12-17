import cloudinary from "../../cfg/cloudinary.js";
import { productsRepository } from "../../db/products/productsRepository.js";
import type { ProductType } from "../../types/types.js";
import { dateNow } from "../../utils/utils.js";

class Admin {
    data: ProductType
    constructor(data: ProductType) {
        this.data = data
    }

    async createdProduct() {
        const rating = 0
        const qntrewies = 0
        const sale = 0
   
        await productsRepository.createProduct(
            this.data.title,
            this.data.description,
            this.data.price,
            this.data.category_id,
            this.data.category,
            this.data.quantity,
            rating,
            qntrewies,
            sale,
            this.data.image_url,
            this.data.created_at,
            this.data.updated_at
        )
        return 1     
    }

    async editProduct() {
        const product = await productsRepository.getProduct(this.data.id)
        if (this.data.image_url ) {
            if (product.public_id) {
                try {
                    await cloudinary.uploader.destroy(product.public_id);
                } catch (error) {
                    console.error(error);
                }
            }
            
        } else {
            this.data.image_url = product.image_url
            this.data.public_id = product.image_url
        }

        await productsRepository.updateProduct(this.data.id, this.data.title, 
            this.data.description, this.data.price, this.data.quantity, this.data.sale,
            this.data.category_id, this.data.category, this.data.image_url, this.data.public_id)
        
      
       
        
    }
    async updateRating() {
        await productsRepository.updateRating(this.data.id, this.data.rating)
    }
    
    async deleteProduct() {
        await productsRepository.deleteProduct(this.data.id)
    }
    
}

export default Admin
import type { Request } from "express"

export type UsersType = {
    id: number
    email: string
    password_hash: string
    status: string
    created_at: string
    updated_at: string
    verifeid_at: string,

}

export type TokensType = {
    id: number
    refresh_token: string
    user_id: number
    created_at: string
    expires_at: string
}
export type CodesType = {
    id: number
    user_id: number
    type: string
    code: string
    token: string
    created_at: string
    expires_at: string
}

export type PayloadType = {
    id: number
    email: string
}

export type UserRecordType = {
    id: number
    code: string
    expires_at: string
}

export type CartType = {
    id: number
    user_id: number
    created_at: string
    updated_at: string
}

export type ProductType = {
    id: number
    title: string
    description: string
    price: number
    image_url: string | null
    category_id: number
    created_at: string
    updated_at: string
}

export type CartItem = {
    id:number
    cart_id:number
    product_id:number
    quantity:number
    price:number
    added_at:string
}

export type OrderType = {
    id:number
    user_id: number
    full_name: string
    phone_number: number
    city:string 
    email: string | null
    comment: string | null
    call:string 
    total_price: number
    status: "yes" | "no"
    created_at:string 
}

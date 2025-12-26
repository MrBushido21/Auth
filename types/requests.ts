import type { OrderFilter, ProductType } from "./types.js"

export type AuthType = {
    email:string
    password_hash:string
}
type DataVerifyType = {
    id: number
    verifeid_code: string
}
export type VerifyType = {
    data: DataVerifyType
}
export type ResetType = {
    email:string
    type: "email" | "password"
}
export type ChangepasswordoremailType = {
    token: string
    newvalue: string
    key: string
    type: string
}
export type CreateOrderType = {
    full_name: string;
    phone_number: number;
    call: string;
    city: string;
    department:string
    email: string | null;
    comment: string | null;
    localCart: any[]    
}
export type GetproductsDataType = {
    search:string
    sort:"asc" | "desc"  
    page:string  
    category_id:string
    filter: OrderFilter
    in_stock?: boolean | undefined
    rating?: boolean | undefined
    sale?: boolean | undefined
}
export type CreateProductType = {
    data: ProductType 
}
export type EditProductType = {
    title: string
    description: string
    price: number
    quantity: number 
    sale: number
    category_id: number
    category: string
}
export type CreaterewieType = {
    product_id:number
    comment:string
    advantage:string
    flaws:string
    rating:number
}
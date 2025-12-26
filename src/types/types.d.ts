export type OrderFilter = "price" | "rating" | "created";
export type SortDirection = "asc" | "desc";
export type UsersType = {
    id: number;
    email: string;
    password_hash: string;
    status: string;
    avatar: string;
    public_id: string;
    created_at: string;
    updated_at: string;
    verifeid_at: string;
};
export type TokensType = {
    id: number;
    refresh_token: string;
    user_id: number;
    created_at: string;
    expires_at: string;
};
export type CodesType = {
    id: number;
    user_id: number;
    type: string;
    code: string;
    token: string;
    created_at: string;
    expires_at: string;
};
export type PayloadType = {
    id: number;
    email: string;
};
export type UserRecordType = {
    id: number;
    code: string;
    expires_at: string;
};
export type CartType = {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
};
export type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: any;
    public_id: any;
    category_id: number;
    category: string;
    quantity: number;
    rating: number;
    qntrewies: number;
    sale: number;
    created_at: string;
    updated_at: string;
};
export type CartItem = {
    product_id: number;
    product_name: string;
    product_img: string;
    quantity: number;
    price: number;
};
export type OrderType = {
    order_id: string;
    user_id: number;
    full_name: string;
    phone_number: string;
    city: string;
    email: string | null;
    comment: string | null;
    call: "yes" | "no";
    total_price: number;
    status: string;
    created_at: string;
};
export type OrderItemsType = {
    id: number;
    order_id: string;
    product_id: number;
    quantity: number;
    price: number;
};
export type RewieType = {
    id: number;
    product_id: number;
    user_id: number;
    comment: string;
    advantage: string;
    flaws: string;
    rating: number;
    created_at: string;
};
export type wishListType = {
    id: number;
    user_id: number;
    product_id: number;
};
export type target_idType = 123 | 313 | 322 | 221 | 413 | 435 | 533 | 646 | 849 | 535 | 532 | 654 | 989 | 523 | 632 | 732 | 832 | 283;
//# sourceMappingURL=types.d.ts.map
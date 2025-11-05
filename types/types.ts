export type UsersType = {
    id: number
    email: string
    password_hash: string
    status: string
    created_at: string
    updated_at: string
    verifeid: string,

}

export type TokensType = {
    id: number
    refresh_token: string
    rest_token: string | undefined
    created_at: string
    updated_at: string
}
export type VerifiedType = {
    id: number
    verifeid_code: number | null
    verifeid_expire_time: number | null
    created_at: string
    updated_at: string
}

export type PayloadType = {
    id: number
    email: string
}
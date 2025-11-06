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
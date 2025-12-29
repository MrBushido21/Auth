// errors.ts
export class UserHasNotPurchasedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "UserHasNotPurchasedError"
    }
}

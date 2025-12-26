import * as auth from "./db.dao.js"

export const authRepository = {
    createUser: auth.createUser,
    addVerificationCode: auth.addVerificationCode,
    addRefreshToken: auth.addRefreshToken,
    addRestToken: auth.addRestToken,
    updateUsers: auth.updateUsers,
    getUserForId: auth.getUserForId,
    getCodeForId: auth.getCodeForId,
    getTokenForId: auth.getTokenForId,
    getResetTokenForKey: auth.getResetTokenForKey,
    getUserForEmail: auth.getUserForEmail,
    getUsers: auth.getUsers,
    deleteUser: auth.deleteUser,
    deleteAll: auth.deleteAll,
    deleteUserCode: auth.deleteUserCode,
    updateRefreshToken: auth.updateRefreshToken,
    updateVerifyStatus: auth.updateVerifyStatus,
    updateVerifyCode: auth.updateVerifyCode,
    changePassword: auth.changePassword,
    changeEmail: auth.changeEmail,
}
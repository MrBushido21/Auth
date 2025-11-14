import { authRepository } from "../../db/auth/authRepository.js";
import type { UsersType } from "../../types/types.js";
import { dateExpire, dateNow, generateCode, hashedString, sendlerEmailCode } from "../../utils/utils.js";

export const userService = {
  async register({ email, password_hash }: { email: string; password_hash: string }): Promise<UsersType> {
    
    const hashedPassword = await hashedString(password_hash);
    const user = {
      id: generateCode(),
      email,
      password_hash: hashedPassword,
      status: "user",
      created_at: dateNow(),
      updated_at: dateNow(),
      verifeid_at: "",
    };

  try {
    await authRepository.createUser(user);    
  } catch (error:any) {
    if (error.message.includes("UNIQUE constraint failed: users.email")) {
      throw new Error ("Email taken")
    }
    console.log(error);
    
    return error
  }

    const code = generateCode().toString();
    try {
      await authRepository.addVerificationCode(user.id, code, dateNow(), dateExpire(120000));     
    } catch (error) {
      console.log(error);
    }

    sendlerEmailCode(email, code)

    return user;
  }
}


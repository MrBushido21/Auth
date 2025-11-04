import {z} from "zod"

export const registerShemas = z.object({
  body: z.object({
    email: z.string().email({message: 'Incorrect email'}),
    password_hash: z.string()
      .min(8, {message: 'Must be minimum 8 symbols'})
      .regex(/[A-Z]/, {message: 'Must be 1 uppercase letter'})
      .regex(/[0-9]/, {message: 'Must be 1 numeric letter'})
      .regex(/[a-z]/, {message: 'Must be 1 lowercase letter'})
      .regex(/[^A-Za-z0-9]/, {message: 'Must be 1 special symbol'})
  })
});
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

export const orderSchema = z.object({
  body: z.object({
    phone_number: z
    .string()
    .regex(/^380\d{9}$/, "Номер телефона должен начинаться с 380 и содержать 12 цифр"),

    full_name: z
    .string()
    .trim()
    .min(3, "Введите корректное ФИО")
    .refine(
      (val) => {
        const parts = val.split(/\s+/);
        return parts.length >= 2;
      },
      { message: "Введите имя и фамилию" }
    )
    .refine(
      (val) => {
        const parts = val.split(/\s+/);
        return parts.every((p) => p.length >= 2);
      },
      { message: "Каждое слово должно содержать минимум 2 буквы" }
    ),

  city: z
    .string()
    .trim()
    .min(2, "Введите город"),

  department: z
  .string()
  .trim()
  .regex(
    /^Відділення №\d+\s*\(до\s*\d+\s*кг на одне місце\):\s*.+$/,
    "Введите корректное отделение. Пример: Відділення №154 (до 30 кг на одне місце): вул. Будівельників, 12"
  )

  })
});

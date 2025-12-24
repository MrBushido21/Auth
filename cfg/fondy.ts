import crypto from "crypto";

export function signFondy(params: Record<string, any>, secret: string) {
  // Сортируем ключи по алфавиту
  const sortedKeys = Object.keys(params).sort();

  // Формируем строку: секрет | value1 | value2 | ...
//   const dataString = [secret, ...sortedKeys.map(key => params[key])].join("|");
  const dataString = sortedKeys.map(key => params[key]).join("|");

  // Вычисляем SHA1
  return crypto.createHash("sha1").update(`${secret}|${dataString}`).digest("hex");
}

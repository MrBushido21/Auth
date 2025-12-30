export const getMonoPublicKey = async (): Promise<string> => {
    const res = await fetch('https://api.monobank.ua/api/merchant/pubkey', {
        method: 'GET',
        headers: {
            "X-Token": process.env.PAYMENT_SECRET_KEY as string
        }
    });

    if (!res.ok) {
        throw new Error(`Ошибка запроса: ${res.status}`);
    }

    const data = await res.json(); // предполагается, что ответ JSON
    return data.key; // если ключ приходит в поле key
};


let cachedPubKey: string | null = null;
let cachedAt = 0;

const TTL = 24 * 60 * 60 * 1000; // 24 часа

export async function getCachedMonoPublicKey() {
  if (cachedPubKey && Date.now() - cachedAt < TTL) {
    return cachedPubKey;
  }

  const key = await getMonoPublicKey(); // fetch к monobank
  cachedPubKey = key;
  cachedAt = Date.now();

  return key;
}

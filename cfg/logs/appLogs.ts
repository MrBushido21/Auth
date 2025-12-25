import type { Request } from "express";
import morgan from "morgan";
import { log } from "./logger.js";

export const logsCfg = (app:any) => {
    function getHumanTime() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()} ` +
         `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

// ======== регистрируем токены =========
morgan.token("localtime", () => getHumanTime());
morgan.token("body", (req) => JSON.stringify((req as Request).body || {}));
morgan.token("query", (req) => JSON.stringify((req as Request).query || {}));

// ======== подключаем Morgan =========
app.use(
  morgan(":localtime :method :url :status :response-time ms body=:body query=:query", {
    stream: { write: (msg) => log(msg.trim()) },
  })
);
}
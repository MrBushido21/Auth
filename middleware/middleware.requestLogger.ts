import fs from "fs";
import path from "path";
import type { Request } from "express";
import morgan from "morgan";

const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, "access.log"),
  { flags: "a" }
);

// логируем body безопасно
morgan.token("body", (req: Request) => {
  if (!req.body) return "";
  const clone = { ...req.body };

  // ⚠️ защита чувствительных данных
  if (clone.password) clone.password = "***";
  if (clone.token) clone.token = "***";

  return JSON.stringify(clone);
});

export const requestLogger = morgan(
  ':date[iso] :method :url :status :response-time ms ip=:remote-addr body=:body',
  {
    stream: accessLogStream,
  }
);

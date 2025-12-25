import fs from "fs";
import path from "path";

const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, "app.log");

function append(message: string) {
  fs.appendFileSync(logFile, message + "\n");
}

function getHumanTime() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2,'0')}.` +
         `${String(now.getMonth()+1).padStart(2,'0')}.` +
         `${now.getFullYear()} ` +
         `${String(now.getHours()).padStart(2,'0')}:` +
         `${String(now.getMinutes()).padStart(2,'0')}:` +
         `${String(now.getSeconds()).padStart(2,'0')}`;
}

export function log(message: string) {
  const time = getHumanTime();
  append(`[${time}] INFO\n${message}\n--------------------------------------------------`);
}

export function logError(err: any) {
  const time = getHumanTime();
  const stack = err?.stack || err;
  append(`[${time}] ERROR\n${stack}\n--------------------------------------------------`);
}


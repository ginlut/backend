const winston = require("winston");
const dotenv = require("dotenv");

dotenv.config();

const buildProdLogger = () => {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "src/utils/logs/warn.log", level: "warn" }),
      new winston.transports.File({ filename: "src/utils/logs/error.log", level: "error" }),
      new winston.transports.File({ filename: "src/utils/logs/info.log", level: "info" }),
    ],
  });

  return prodLogger;
};

const buildDevLogger = () => {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "info" })],
  });

  return devLogger;
};

let logger;

if (process.env.NODE_ENV.toLocaleUpperCase() === "PROD") {
  logger = buildProdLogger();
} else {
  logger = buildDevLogger();
}

module.exports = logger;

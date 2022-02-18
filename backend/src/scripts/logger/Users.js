const winston = require('winston');
const path = require('path');
const folderPath = path.join(__dirname, "../../", "logs/users");
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Users' },
    transports: [
      new winston.transports.File({ filename: `${folderPath}/error.log`, level: 'error' }),
      new winston.transports.File({ filename: `${folderPath}/info.log`, level: 'info' }),
      new winston.transports.File({ filename: `${folderPath}/combined.log` }),
    ],
  });

module.exports = logger;
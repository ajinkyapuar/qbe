// const appRoot = require("app-root-path")
// const winston = require("winston")
// const { AzureLogger } = require('winston-azuretable')

// var options = {
//     file: {
//         level: 'info',
//         filename: `${appRoot}/logs/app.log`,
//         handleExceptions: true,
//         json: true,
//         colorize: false
//     },
//     console: {
//         level: 'error',
//         handleExceptions: true,
//         json: false,
//         colorize: true

//     },
//     azure:{
//         tableName:'logTable',
//         handleExceptions: true,
//         json:true,
//         partitionKey:'logKey'
//     }
// }

// var logger = new winston.createLogger({
//     transports: [
//         new winston.transports.File(options.file),
//         new winston.transports.Console(options.console),
//         new AzureLogger(options.azure)
//         ],
//     exitOnError: false
// })


// logger.stream = {
//     write: function (message, encoding) {
//         logger.info(message)
//     }
// }

// module.exports = logger
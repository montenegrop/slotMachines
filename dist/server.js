'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
require('dotenv/config')
const app_js_1 = __importDefault(require('./app.js'))
const PORT = process.env.PORT
app_js_1.default
  .listen(PORT, () => {
    console.log('servidor escuchando en el puerto ' + PORT)
  })
  .on('error', (error) => {
    console.log('el error es: ', error)
  })

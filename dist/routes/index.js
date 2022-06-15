'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const rollRouter = (0, express_1.Router)()
rollRouter.get('/victorious', (_, res) => {
  res.status(200).json({ message: 'ok' })
})
exports.default = rollRouter

const path = require('path')
const serve = require('serve')
const cypress = require('cypress')

const server = serve(path.join(__dirname, '..', 'dist'))

cypress.run({
  browser: 'electron',
  record: process.env.RECORD_KEY || false,
  key: process.env.RECORD_KEY || null
}).then(res => server.stop())

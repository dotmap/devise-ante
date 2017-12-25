const path = require('path')
const serve = require('serve')
const cypress = require('cypress')

const server = serve(path.join(__dirname, '..', 'dist'), {
  port: 3000
})

cypress.run({
  browser: 'electron',
  record: process.env.RECORD_KEY || false,
  key: process.env.RECORD_KEY || null
}).then(res => {
  server.stop()
  if (res.failures > 0) {
    console.error(new Error(`${res.failures} out of ${res.tests} tests failed in ${res.duration}. Take a look at the log above for details.`))
    process.exit(1)
  }
}).catch(err => { throw new Error(err) })

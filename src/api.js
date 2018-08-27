const express = require('express')
const fs = require('fs')
const path = require('path')
const fallback = require('express-history-api-fallback')

const app = express()
const filePath = path.join(__dirname, '../data/db.csv')

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    /*
      Auth middleware example
      Clients without valid certificate are rejected
      Additional certificate checks can be placed here
    */
    const cert = req.socket.getPeerCertificate()
    if (cert && cert.subject.CN === 'DEMO-CLIENT') {
      next()
    } else {
      res.sendStatus(403)
    }
  })
}

app.use(express.static('dist'))
app.use(express.json())

const api = express()

api.get('/', (req, res) => {
  let data = fs.readFileSync(filePath)
  let arr = data.toString().split(',')
  res.send({
    leftSide: arr[0],
    rightSide: arr[1]
  })
})

api.post('/setForm', (req, res) => {
  fs.writeFileSync(filePath, `${req.body.leftSide},${req.body.rightSide}`)
  res.send({ status: 'ok' })
})

api.get('/user', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const cert = req.socket.getPeerCertificate()
    if (cert && cert.subject.CN) {
      res.send({ username: cert.subject.CN })
    } else {
      res.send({ username: '[ unknown ]' })
    }
  } else {
    res.send({ username: '[ development ]' })
  }
})

app.use('/api', api)
app.use(fallback(path.join(__dirname, '../dist/index.html')))

if (process.env.NODE_ENV === 'production') {
  const https = require('https')
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, '../cert/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '../cert/server.pem')),
    ca: fs.readFileSync(path.join(__dirname, '../cert/ca.crt')),
    requestCert: true
  }

  https.createServer(sslOptions, app).listen(3000)
} else {
  const http = require('http')
  http.createServer(app).listen(3000)
}

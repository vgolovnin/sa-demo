const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const filePath = path.join(__dirname, '../data/db.csv')

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
  console.log(req)
  fs.writeFileSync(filePath, `${req.body.leftSide},${req.body.rightSide}`)
  res.send({ status: 'ok' })
})

app.use('/api', api)
app.listen(3000)

console.log('Server started in ' + process.env.NODE_ENV + ' mode')

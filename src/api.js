const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const filePath = path.join(__dirname, '../db.csv')

app.use(express.json())

app.get('/', (req, res) => {
  let data = fs.readFileSync(filePath)
  let arr = data.toString().split(',')
  res.send({
    leftSide: arr[0],
    rightSide: arr[1]
  })
})

app.post('/setForm', (req, res) => {
  console.log(req)
  fs.writeFileSync(filePath, `${req.body.leftSide},${req.body.rightSide}`)
  res.send({ status: 'ok' })
})

app.listen(3000)

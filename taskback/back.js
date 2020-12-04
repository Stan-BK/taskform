const express = require('express')
const app = express()
const port = 3000
const login = require('./login')
const createArtical = require('./artical/createArtical')
const getArtical = require('./artical/getArtical')
const saveArtical = require('./artical/saveArtical')
const removeArtical = require('./artical/removeArtical')

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/login', (req, res) => {
  console.log('登录:')
  console.log(req.query)
  login(req.query).then(val => {
    res.send(val)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.post('/createArtical', (req, res) => {
  console.log('创建文章:')
  console.log(req.query)
  createArtical(req.query).then(val => {
    res.send(val)
  }).catch(err => {
    console.log(err)
    res.status(400).send(err)
  })
})

app.get('/getArtical', (req, res) => {
  console.log('获取文章:')
  console.log(req.query)
  getArtical(req.query.userid).then(val => {
    res.send(val)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.post('/saveArtical', (req, res) => {
  console.log('保存文章:')
  console.log(req.query)
  saveArtical(req.query).then(val => {
    res.send(val)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.post('/removeArtical', (req, res) => {
  console.log('删除文章:')
  console.log(req.query)
  removeArtical(req.query.artical).then(val => {
    res.send(val)
  }).catch(err => {
    res.status(400).send(err)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
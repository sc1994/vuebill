var Mongoose = require('mongoose')
var User = require('../models/user.js')
var Bill = require('../models/bill.js')

module.exports = function (app) {
  app.post('/user/signup', function (req, res) {
    User.findOne({
      name: req.body.name
    }, function (err, data) {
      if (data) {
        res.json({
          code: 0,
          msg: '已存在的账户, 试试登陆?'
        })
      } else {
        var model = new User();
        model.name = req.body.name
        model.password = req.body.pwd
        model.consumeType = ['吃饭', '交通', '服装', '房租', '加油']
        model.src = '../static/img/可达鸭.jpg'
        model.save(function (err) {
          res.json({
            code: 1,
            err: err,
            data: model
          })
        })
      }
    })
  })

  app.post('/user/signin', function (req, res) {
    var name = req.body.name
    var pwd = req.body.pwd
    User.findOne({
      name: name,
      password: pwd
    }, function (err, data) {
      if (data) {
        res.json({
          code: 1,
          data: data
        })
      } else {
        res.json({
          code: 0
        })
      }
    })
  })

  app.post('/addbill', function (req, res) {
    var amount = req.body.amount
    var type = req.body.type
    var isMore = req.body.isMore
    var name = req.body.name
    User.findOne({
      name: name
    }, function (err, data) {
      var user = data
      if (isMore && data.consumeType.indexOf(type) < 0) {
        console.log(data)
        data.consumeType.push(type)
        data.save(function (err) {
          if (err) {
            console.error(err)
          }
        })
      }
      var bill = new Bill()
      bill.name = name
      bill.type = type
      bill.amount = amount
      bill.save(function (err) {
        if (err) {
          console.error(err)
        }
      })
      console.log({
        code: 1,
        data: user
      })
      res.json({
        code: 1,
        data: user
      })
    })
  })
}

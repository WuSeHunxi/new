/**
 * 
 * 路由处理 router
 * 
 */

var express = require('express')
var User = require('./models/user')
//加密-->防止数据库泄露被人知道密码
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
  // console.log(req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body

  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body//获取表单提交的数据
  //使用find进行查找
  User.findOne({//只能查出来一个
    //表示或者条件，二者有一个满足条件就行
    //MongoDB的语法
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    //通过前端的操作处理响应结果
    if (err) {
      //express的json()方法-->将对象转成字符串，发送给浏览器
      //给客户端发送500，表示服务端异常
      return res.status(500).json({
        err_code: 500,//程序错误
        message: 'Internal error.'
      })
    }
    // console.log(data)
    if (data) {//data存在，则表示已经注册完了
      // 邮箱或者昵称已存在 为了和服务端同步使用json，方便ajax对响应处理
      return res.status(200).json({//业务成功，但是提交的内容存在
        //业务状态码，为了注册成功还是失败
        err_code: 1,
        //利用服务端渲染提交表单之后的结果，这种方法比使用ajax安全
        message: 'Email or nickname aleady exists.'
      })
      return res.send(`邮箱或者密码已存在，请重试`)
    }

    // 对密码进行 md5 重复加密  两层加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        //下面返回的是json格式的字符串
        return res.status(500).json({
          err_code: 500,//服务端错误
          message: 'Internal error.'
        })
      }

      // 注册成功，使用 Session 记录用户的登陆状态
      req.session.user = user

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })

      // 服务端重定向只针对同步请求才有效，异步请求无效，所以回到最开始的页面不能使用重定向
      // res.redirect('/')


      /**
       * 该处处理的代码是同步的，完全都是服务端处理的
       */
      // return res.render('register.html',{
      //   err_message:"邮箱或密码已存在"
      // })
    })
  })
})

router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null

  // 重定向到登录页
  res.redirect('/login')
})

// router.post('/register', async function (req, res) {
//   var body = req.body
//   try {
//     if (await User.findOne({ email: body.email })) {
//       return res.status(200).json({
//         err_code: 1,
//         message: '邮箱已存在'
//       })
//     }

//     if (await User.findOne({ nickname: body.nickname })) {
//       return res.status(200).json({
//         err_code: 2,
//         message: '昵称已存在'
//       })
//     }

//     // 对密码进行 md5 重复加密
//     body.password = md5(md5(body.password))

//     // 创建用户，执行注册
//     await new User(body).save()

//     res.status(200).json({
//       err_code: 0,
//       message: 'OK'
//     })
//   } catch (err) {
//     res.status(500).json({
//       err_code: 500,
//       message: err.message
//     })
//   }
// })

module.exports = router

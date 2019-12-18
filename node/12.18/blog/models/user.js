/**
 * 
 * 设计数据模型
 * 
 */
var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //创建时间
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  //最后一次修改时间
  last_modified_time: {
    type: Date,
    default: Date.now//当前的最新时间
  },
  //头像img文件夹中的
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  //介绍，简介
  bio: {
    type: String,
    default: ''//为了保持数据结构的完整性(每一个字段几乎都有默认值)，虽然不是必须的，但是依然该给它一个''
  },
  //性别
  gender: {
    type: Number,
    //保密 男 女
    enum: [-1, 0, 1],
    default: -1//默认情况下是保密
  },
  birthday: {
    type: Date//生日没有默认值
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
})

//导出集合
module.exports = mongoose.model('User', userSchema)

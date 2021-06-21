const UserModel = require("./userModel");
const jwt = require('jsonwebtoken')
const BlackListModel = require("./blackListModel")

function checkToken(req, res, next){
  let cookie = req.cookies.user;
  BlackListModel.findOne({token: cookie})
  .then((data) => {
    if(data){
      res.json('cookie không hợp lệ')
    }else{
      next()
    }
  })
  .catch((err) => {
    res.json('lỗi server')
  }) 
}

function checkCookie(req, res, next) {
  let cookie = req.cookies.user;
  let id = jwt.verify(cookie, "khang").id  //dịch cookie bị mã hóa
  UserModel.findOne({_id:id})
    .then((data) => {
      if (data) {
        next();
      } else {
        res.json("chua dang nhap");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function check_Cookie(cookie) {
  let id = jwt.verify(cookie, "khang").id //dịch cookie bị mã hóa
  return id
}

function checkRoleAdmin(req, res, next) {
  if(req.role === 'admin'){
      next();
  }else{
    res.json('ban khong phai admin')
  }
}

module.exports = { checkCookie, checkRoleAdmin, checkToken ,check_Cookie};

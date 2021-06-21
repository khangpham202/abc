const express = require("express");
const UserModel = require("./userModel");
const router = express.Router();
const checkAuth = require("./checkAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res) => {
  let data = UserModel.findOne({ username: req.body.username }).then((data) => {
    if (data) {
      res.json("user da ton tai");
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          // Store hash in your password DB.
          UserModel.create({ username: req.body.username, password: hash })
            .then((data) => {
              res.json("create account succesfully");
            })
            .catch((err) => {
              res.json(err);
            });
        });
      });
    }
  });
});

router.post("/dangNhap", async (req, res) => {
  // try {
  //   let data = await UserModel.findOne({
  //     username: req.body.username,
  //   });
  //   if (data) {
  //     var crypt = await bcrypt.compare(req.body.password, data.password);
  //     if (crypt) {
  //       let token = jwt.sign({ id: data._id }, "khang");
  //       res.json({ token: token });
  //     } else {
  //       res.json({ token: "" });
  //     }
  //   } else {
  //     res.json({ token: "" });
  //   }
  // } catch (error) {
  //   res.json(error);
  // }
  try {
    const data = await  UserModel.findOne({username: req.body.username})
    if(!data){ 
      return res.json('sai tài khoản')
    }
    const check =  bcrypt.compareSync(req.body.password, data.password); // true
    if(check){
      var token = jwt.sign({ id: data._id }, "khang");
      return res.json(token)
    }
    return res.json("sai mật khẩu")
  } catch (error) {
    return res.json(error)
  }
 
});

router.post("/checkCookie", checkAuth.checkToken,checkAuth.checkCookie, (req, res) => {
    res.json("da dang nhap");
  }
); 

router.delete(
  "/:id",
  checkAuth.checkCookie,
  checkAuth.checkRoleAdmin,
  (req, res) => {
    UserModel.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

router.put("/", async (req,res) => {
  try {
    let id = checkAuth.check_Cookie(req.cookies.user)
    let oldpass = req.body.password;
    let newpass = req.body.newpass;
    const checkpass = await UserModel.findById(id)
    const check =  bcrypt.compareSync(oldpass, checkpass.password); // true
    if(check){
    const hash = bcrypt.hashSync(newpass, saltRounds);
    const data = await  UserModel.updateOne({_id:id},{password:hash})
      return res.json("đổi mật khẩu thành công")
    }
    return res.json("mật khẩu cũ sai")
  } catch (error) {
    return res.json(error)
  }
})
module.exports = router;  

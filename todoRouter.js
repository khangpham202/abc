const express = require("express")
const TodoModel = require('./todoModel')
const router = express.Router()
const checkAuth = require('./checkAuth')

router.get("/", (req, res) => {
    TodoModel.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  // lấy cụ thể 1 data
  router.get("/:id", (req, res) => {
    let id = req.params.id;
    TodoModel.findOne({ _id: id })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.json("NOT FOUND");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });
  //xóa nhiều data
  router.delete("/todo/deleteMany", (req, res) => {
    TodoModel.deleteMany({ _id: {$in: req.body['list[]'] } })
      .then((data) => {
        if (data.deletedCount) {
          res.json(" Xoa thanh cong");
        } else {
          res.json("Xoa that bai");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });
  // thêm data
  router.post("/", checkAuth.checkCookie, (req, res) => {
      console.log(req.cookies);
      TodoModel.create({ ten: req.body.ten })
        .then((data) => {
          if(data){
            res.json({
              mes: "tao thanh cong",
              err: false,
              data: data,
              status: 200
            });
          }else{
           res.json({
            mes: "tao that bai",
            err: false,
            data: '',
            status:300
           })
          }
        })
        .catch((err) => {
          res.json({
            mes: "tao that bai",
            err: err,
            data: '',
            status: 500
          });
        });
  });
  // xóa  1 data
  router.delete("/:id", (req, res) => {
    let id = req.params.id;
    TodoModel.deleteOne({ _id: id })
      .then((data) => {
        if (data.deletedCount) {
          res.json(" Xoa thanh cong");
        } else {
          res.json("Xoa that bai");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // sửa data
  router.put("/:id", (req, res) => {
    let id = req.params.id;
    TodoModel.updateOne({ _id: id }, {ten: req.body.ten})
      .then((data) => {
        if (data.nModified) {
          res.json("update thanh cong");
        } else {
          res.json("noi dung khong doi");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router

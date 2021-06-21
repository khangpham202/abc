//file server

//import + tạo app
const express = require("express");
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const UserRouter = require("./userRouter")
const TodoModel = require("./todoModel");
const TodoRouter = require("./todoRouter")
const checkAuth = require("./checkAuth");
const BlackListModel = require("./blackListModel")

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static
app.use('/public', express.static(path.join(__dirname, "/public")))
app.use('/api/user/',UserRouter)
app.use('/api/todo/',TodoRouter)
//html
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/todo.html'))
})
app.get('/dangky', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/dangky.html'))
})
app.get('/dangnhap', (req,res) => {
  res.sendFile(path.join(__dirname,'./public/html/dangnhap.html'))
})
app.get('/private', (req,res) => {
  res.sendFile(path.join(__dirname,'./public/html/private.html'))
})

app.post('/api/blackList/', checkAuth.checkCookie, (req,res) => {
    let token = req.cookies.user
    console.log(token);
    BlackListModel.create({token: token})
    .then((data) => {
      res.json('đăng xuất thành công')
    })
    .catch((err) => {
      res.json('lỗi server')
    })
})
//API,Router
app.get("/", (req, res) => {
  // res.json("hello")
});
// lấy toàn bộ
// app.get("/api/todo", (req, res) => {
//   TodoModel.find()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });
// // lấy cụ thể 1 data
// app.get("/api/todo/:id", (req, res) => {
//   let id = req.params.id;
//   TodoModel.findOne({ _id: id })
//     .then((data) => {
//       if (data) {
//         res.json(data);
//       } else {
//         res.json("NOT FOUND");
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// // thêm data
// app.post("/api/todo", (req, res) => {
//     console.log(req.cookies);
//     TodoModel.create({ ten: req.body.ten })
//       .then((data) => {
//         if(data){
//           res.json({
//             mes: "tao thanh cong",
//             err: false,
//             data: data,
//             status: 200
//           });
//         }else{
//          res.json({
//           mes: "tao that bai",
//           err: false,
//           data: '',
//           status:300
//          })
//         }
//       })
//       .catch((err) => {
//         res.json({
//           mes: "tao that bai",
//           err: err,
//           data: '',
//           status: 500
//         });
//       });
// });
// // xóa  1 data
// app.delete("/api/todo/:id", (req, res) => {
//   let id = req.params.id;
//   TodoModel.deleteOne({ _id: id })
//     .then((data) => {
//       if (data.deletedCount) {
//         res.json(" Xoa thanh cong");
//       } else {
//         res.json("Xoa that bai");
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });
// //xóa nhiều data
// app.delete("/api/todotest/deleteMany", (req, res) => {
//   TodoModel.deleteMany({ _id: {$in: req.body['list[]'] } })
//     .then((data) => {
//       if (data.deletedCount) {
//         res.json(" Xoa thanh cong");
//       } else {
//         res.json("Xoa that bai");
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });
// // sửa data
// app.put("/api/todo/:id", (req, res) => {
//   let id = req.params.id;
//   TodoModel.updateOne({ _id: id }, {ten: req.body.ten})
//     .then((data) => {
//       if (data.nModified) {
//         res.json("update thanh cong");
//       } else {
//         res.json("noi dung khong doi");
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//tạo cổng nghe
app.listen(3000);

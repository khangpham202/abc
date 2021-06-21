// import
const mongoose = require("./connectdb");
// connect db
// tạo schema
const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  { collection: "user" }
);
// tạo model
const UserModel = mongoose.model("user", UserSchema);
// export
module.exports = UserModel;

// UserModel.create(
//   {
//     username: "khang",
//     password: "1",
//     role: "admin",
//   },
//   {
//     username: "user",
//     password: "2",
//     role: "user", 
//   }
// );
UserModel.create({username: 'test',password:"test" })

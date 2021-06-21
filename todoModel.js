// import
const mongoose = require("mongoose");
// connect db
mongoose.connect('mongodb://localhost/Khang', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// tạo schema
const todoSchema = mongoose.Schema({
    ten: String,
    hoanThanh: {
      type: Boolean,
      default: false,
    },
},{collection: 'list'});  
// tạo model
const TodoModel = mongoose.model("list",todoSchema) 
// export
module.exports = TodoModel;

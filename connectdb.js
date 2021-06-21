//import
const mongoose = require("mongoose");
// connect db
mongoose.connect(
  'mongodb+srv://khang2612:aspecial11@cluster0.ph8t7.mongodb.net/Khang?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
(err) => {
    if(err){
        console.log(err);
    }else{
        console.log('connect thanh cong');
    }
}

module.exports = mongoose
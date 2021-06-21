const bcrypt = require("bcrypt");
const saltRounds = 5;
let hash1 = "$2b$05$1/XjCKFtGIVFixLTquBW7./jzrFvxWR/UZI2/PiXeZSAw4kHR/kkm";
let hash2 = "$2b$05$hiDoC0xnekHEY6J/1rem6ONhTs6JlvJTbI.deZydpA75Z07lxwX/y";
let password = "helloworld";

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         // Store hash in your password DB.
//         if(hash){
//             console.log(hash);
//         }else{
//             console.log(err);
//         }
//     });
// });

bcrypt.compare(password, hash1, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

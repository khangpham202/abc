// const jwt = require("jsonwebtoken")

let token = jwt.sign({ten:'khang'}, 'nodemy', {expiresIn: '1 day'} )

let string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW4iOiJraGFuZyIsImlhdCI6MTYyMzgzMTE2OCwiZXhwIjoxNjIzOTE3NTY4fQ.LEtOj99ncwjHDup3dP1QYn72poIct4TSWnPK5zM9vrE'
let data = jwt.verify(string, 'nodemy')
// console.log(data);


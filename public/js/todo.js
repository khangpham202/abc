render();

function xoa(id) {
  $.ajax({
    url: "/api/todo/" + id,
    type: "DELETE",
  })
    .then((data) => {
      console.log(data);
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}

function them() {
  $.ajax({
    url: "/api/todo",
    type: "POST",
    data: {
      ten: $(".ten").val(),
    },
  })
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        render();
      }
      $(".notice").html(data.mes);
    })
    .catch((err) => {
      console.log(err);
    });
}
var id = ''
function sua(id) {
  $(".updateInput").remove();
  let input = `<div class='updateInput'> <input class = 'newND${id}'> 
                   <button onclick='update("${id}")'>xac nhan</button>
              </div>`;
  $(`#${id}`).append(input);
}

function update(id) {
  console.log($(`.newND${id}`).val());
  $.ajax({
    url: "/api/todo/" + id,
    type: "PUT",
    data: { ten: $(`.newND${id}`).val() },
  })
    .then((data) => {
      console.log(data);
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}

function render() {
  $(".list").html("");
  $.ajax({
    url: "http://localhost:3000/api/todo",
    type: "GET",
  })
    .then((data) => {
      console.log(data);
      data.map((ele) => {
        let checked = " ";
        if (ele.hoanThanh) {
          checked = "checked";
        }
        let div = `
        <div id = "${ele._id}">
          <div class='task' >
          <div >${ele.ten} <input type="checkbox" name="" id="" ${checked}> 
          <button onclick='sua("${ele._id}")' class='sua'>Sua</button> 
          <button onclick='xoa("${ele._id}")'> X </button>         
          </div>
          </div>
        </div>
        `;
        $(".list").append(div);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addcheckBox() {
  renderWithcheckBox();
}

function renderWithcheckBox() {
  $(".list").html("");
  $.ajax({
    url: "http://localhost:3000/api/todo",
    type: "GET",
  })
    .then((data) => {
      console.log(data);
      data.map((ele) => {
        let checked = " ";
        if (ele.hoanThanh) {
          checked = "checked";
        }
        let div = `
        <div id = "${ele._id}">
          <div class='task'>
            <div >${ele.ten} 
            <input type="checkbox" name="" id="" ${checked}> 
            <button onclick='sua("${ele._id}")'>Sua</button>
            <button onclick='changePassword("${ele._id}")'> Đổi mật khẩu </button> 
            <button onclick='xoa("${ele._id}")'> X </button>         
            <input type="checkbox" name="" id="" class='check${ele._id} deleteManyCheckBox'> </input>
            </div>
          </div>
        </div>
        `;
        $(".list").append(div);
      });
      $(".deleteManyButton").remove();
      let deleteMany = `<button onclick="deleteChecked()" class="deleteManyButton"> Xóa bản ghi đã chọn</button>`;
      $(".deleteManyGroup").append(deleteMany);
    })
    .catch((err) => {
      console.log(err);
    });
}
function deleteChecked() {
  let checkBoxlist = $(".deleteManyCheckBox");
  let idList = [];
  for (let i = 0; i < checkBoxlist.length; i++) {
    console.log(checkBoxlist[i].checked);
    if (checkBoxlist[i].checked == true) {
      let inputClass = $(checkBoxlist[i]).attr("class").slice(5, 29);
      idList.push(inputClass);
    }
  }
  console.log(idList);
  $.ajax({
    url: "/api/todo/deleteMany",
    type: "DELETE",
    data: { list: idList },
  })
    .then((data) => {
      console.log(data);
      $(".deleteManyButton").remove();
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}

// setCookie("Khang", "261202", 1);

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$.ajax({
  url: "/api/user/checkCookie",
  type: "POST",
})
  .then((data) => {
    console.log(data);
    if (data != "da dang nhap") {
      window.location.href = "/dangnhap";
    }
  })
  .catch((err) => {
    console.log(err);
    // window.location.href = '/dangnhap';
  });

function signOut() {
  $.ajax({
    url: "/api/blackList",
    type: "POST",
  })
    .then((data) => {
      console.log(data);
      if (data === "đăng xuất thành công") {
        delete_cookie("user");
        window.location.href = "/dangnhap";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function changePassword() {
  $("#div1").remove();
  let div = `<div id="div1">
              <div>Nhập mật khẩu cũ: <input type="password" class="Oldpassword"></input></div> 
              <div>Nhập mật khẩu mới: <input type="password" class="Newpassword"></input></div>
              <div>Nhập lại mật khẩu mới: <input type="password" class="Confirmpassword"></input></div>
              <button onclick="upDate()"> Xác nhận </button>
            </div>`;
  $(".change").append(div); 
}
function upDate() {
  if ($(".Newpassword").val() === $(".Confirmpassword").val()) {
    $.ajax({
      url: "/api/user",
      type: "PUT",
      data: {
        password: $(".Oldpassword").val(),
        newpass: $(".Newpassword").val(),
      },
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }else{
     console.log("Mật khẩu không khớp");
  } 
}


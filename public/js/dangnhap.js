function dangNhap(){
    $.ajax({
        url: '/api/user/dangNhap',
        type: 'POST',
        data:{
            username: $(".username").val(),
            password: $(".password").val()
        }
    })
    .then((data) => {
        if(data === "sai mật khẩu"){
            console.log(data)
            return
        }else{
            if(data === 'sai tài khoản'){
                console.log(data);
                return
            }
            console.log(data);
            setCookie('user', data, 30)
            window.location.href = '/';  
            return 
        }
        
       
    })
    .catch((err) => {
        console.log(err);
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

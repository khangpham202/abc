function dangky(){
    console.log($(".username").val() , $(".password").val());
    $.ajax({
        url: '/api/user',
        type: 'POST',
        data:{
            username: $(".username").val(),
            password: $(".password").val()
        }
    })
    .then((data) => {
        console.log(data);
        
    })
    .catch((err) => {
        console.log(err);
    })
}
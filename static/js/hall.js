//保持登录
var $ouser_showName = $('#user_showName');
var $ologin_status = $('#login_status');

$(function () {
    $.ajax({
        url: "/polls/Hall/",
        type: "POST",
        data: "1223334",
        dataType: 'json',
        success: function (data) {

            var current_uer = data['current_user'];

            if (current_uer != "") {
                // alert(current_uer)
                $('#user_showName').text(current_uer);
                $('#login_status').text("欢迎使用！")
            } else {
                $ouser_showName.text("游客");
                $ologin_status.text("请先登录")
            }

        }
    })
});



function getDetails(key) {
    // alert(key)
    var str_key = key.toString()
    // console.log(key)
    var data = JSON.stringify({
        'image_id': str_key,
    });
    // alert(data)
    $.ajax({
        url: "/polls/ImageDetail/",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function (data) {
            // alert(data)
            window.location.href = "http://127.0.0.1:8000/polls/toImageDetail/";
        }
    })
}
//保持登录
var $ouser_showName = $('#user_showName');

$(function () {
    $.ajax({
        url: "/polls/getDetail/",
        type: "POST",
        data: "",
        dataType: 'json',
        success: function (data) {
          // alert(data)
            if(data != ""){
                // alert(current_uer)
                $('#user_showName').text(data['current_user']);
                $('#login_status').text("欢迎使用！")

                // alert(data)
                var image = data['images']
                // console.log(image[0])
                $('#ini_img').attr('src', "http://127.0.0.1:8000/static/Data/input/"+image[0]['image_name']);
                $('#pre_img').attr('src', "http://127.0.0.1:8000/static/Data/finalOutput/"+image[0]['image_name']);
                $('#show_name').text(image[0]['image_name']);
                $('#show_publisher').text(image[0]['image_publisher']);
                $('#show_id').text(image[0]['image_id']);
                $('#show_0').text(image[0]['image_background']);
                $('#show_1').text(image[0]['image_yancao']);
                $('#show_2').text(image[0]['image_yumi']);
                $('#show_3').text(image[0]['image_yirenmi']);
                $('#show_4').text(image[0]['image_jianzhu']);
                $("#comment_text").text(image[0]['image_comment']);
                if(data['star']=='1'){
                    $('#star').attr('src', "http://127.0.0.1:8000/static/img/star.png");
                    $("#star-img").text("取消收藏");
                }else {
                    $('#star').attr('src', "http://127.0.0.1:8000/static/img/unstar.png");
                    $("#star-img").text("收藏");
                }
            }else {
                $ouser_showName.text("游客");
                $ologin_status.text("请先登录")
            }
        }
    })
});


//下面是收藏或者取消收藏
$("#star").click(function () {

    // 获取是否公开的信息
    var star = document.getElementById('star-img').innerHTML;
    var user = document.getElementById('user_showName').innerHTML;
    var image = document.getElementById('show_id').innerHTML;

    //设置行为的类型
    if(star=="取消收藏"){
        type = "1"
    }else{
        type = "0"
    }

    var data = JSON.stringify({
        'type': type,
        'user': user,
        'image':image
    });

    $.ajax({
        url: "/polls/star/",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function (data) {
            // alert(data)
            if(data['type']=='1'){
                alert("取消收藏成功！")
                $('#star').attr('src', "http://127.0.0.1:8000/static/img/unstar.png");
                $("#star-img").text("收藏");
            }else {
                alert("收藏成功！")
                $('#star').attr('src', "http://127.0.0.1:8000/static/img/star.png");
                $("#star-img").text("取消收藏");
            }
            // $('#hand-img').text("提交成功！");
        }
    })
})


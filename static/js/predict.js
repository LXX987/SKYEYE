//保持登录
var $ouser_showName = $('#user_showName');
var $ologin_status = $('#login_status');

$(function () {
    $.ajax({
        url: "/polls/predict/",
        type: "POST",
        data: "",
        dataType: 'json',
        success: function (data) {

            var current_uer = data['current_user'];

            // alert(data)
            if (data != "") {
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


var iName = ""
//下面是上传图片
$("#getImage_btn").click(function () {
    // 创建一个表单对象（用于存储要发送的data数据）
    form_data = new FormData;
    // 参数1：后端请求时要获取的参数, 参数2：图片文件File对象
    form_data.append("files", $("#file_img")[0].files[0]);

    // alert(data)
    $.ajax({
        // async : false,
        url: "/polls/getImg/",
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
            // alert( data['image_name'])
            iName = data['image_name']
            // console.log(data['image_path'])
            // console.log(data['pre_label']),
            // alert( data['image_path'])
            $('#ini_img').attr('src', data['image_path']);
            $('#upload-img').text("上传成功！");
            // alert(iName)
            // console.log(iName)
        }
    })
    // get();//此处为上传文件的进度条
})


//下面执行预测行为
$("#toPre").click(function () {
    var data = JSON.stringify({
        'iName': iName,
    });
    // alert(data)
    $.ajax({

        beforeSend: function(){
            $("#icon").addClass("fa fa-circle-o-notch fa-spin");
        },

        // async : false,
        url: "/polls/dopredict/",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#predict-img').text("预测成功！");
            $('#pre_img').attr('src', data['pre_label']);
            $('#show_name').text(data['image_name']);
            $('#show_0').text(data['background']);
            $('#show_1').text(data['yancao']);
            $('#show_2').text(data['yumi']);
            $('#show_3').text(data['yirenmi']);
            $('#show_4').text(data['jianzhuwu']);

            $("#icon").removeClass("fa fa-circle-o-notch fa-spin");

        }
    })
    // get();//此处为上传文件的进度条
})


//下面提交图片信息到数据库
$("#todb").click(function () {

    // 获取是否公开的信息
    var isPublish = document.getElementById('publish_or').checked;
    // alert(isPublish)
    var pub = "";
    if (isPublish) {
        pub = "1";
    } else {
        pub = "0";
    }
     // alert(pub)
    var data = JSON.stringify({
        'iName': iName,
        'iComment': document.getElementById('comment_text').value,
        'publisher': document.getElementById('user_showName').innerHTML,
        'publish': pub,
        'background': document.getElementById('show_0').innerHTML,
        'yancao': document.getElementById('show_1').innerHTML,
        'yumi': document.getElementById('show_2').innerHTML,
        'yirenmi': document.getElementById('show_3').innerHTML,
        'jianzhuwu': document.getElementById('show_4').innerHTML,
    });

    // alert(data)
    // alert(data['iaddress'], data['publish'])
    $.ajax({
        // async : false,
        url: "/polls/todb/",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function (data) {
            // alert(data)
            $('#hand-img').text("提交成功！");
            // console.log(data)
        }
    })
})

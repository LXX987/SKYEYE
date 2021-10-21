//登录
$("#login").click(function (){
	var oPhone=$("#phone").val();
    var oPassword=$("#password").val();
	// alert(oPhone, oPassword)
	var data= JSON.stringify({
		'phone': oPhone,
		'password':oPassword
	});
	// alert(data)
	 $.ajax({
		 // async : false,
		url:"/polls/login/",
		type:"POST",
		data:data,
		dataType: 'json',
		success: function (data) {
			if(data=="1"){
				window.location.href = "http://127.0.0.1:8000/polls/toImages/";
			}else if(data == "2"){
				alert("密码错误！")
			}else{
				alert("该账号尚未注册，请先注册！")
			}
		}
	})
})

//注册
$("#register").click(function (){
	var oPhone=$("#user").val();
    var oPassword=$("#pwd").val();
    var oPassword_2=$("#pwd_2").val();
	var data= JSON.stringify({
		'phone': oPhone,
		'password':oPassword,
		'password_2':oPassword_2
	});
	// alert(data)
	 $.ajax({
		url:"/polls/register/",
		type:"POST",
		data:data,
		dataType: 'json',
		success: function (data) {
			if(data=="1"){
				alert("该账号已存在！")
			}else if(data == "2"){
				alert("注册成功！")
			}else{
				alert("两次密码不一致！")
			}
		}
	})
})





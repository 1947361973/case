var ouser = document.getElementById("user");
var opass = document.getElementById("pass");
var obtn = document.getElementById("btn");
var oyzm = document.getElementById("prove")
var oprove_r = document.getElementById("prove_r")

var goods = localStorage.getItem("goods"); //接收本地存储的数据
var goodss = JSON.parse(goods) //转成对象的格式
for (let i = 0; i < goodss.length; i++) { //遍历对象数组
    console.log(goodss[i].name) //打印用户名
    obtn.onclick = function() { //点击登录按钮的时候

   let myArr = [goodss[i].name,goodss[i].password,oprove_r.value]
		var a = ouser.value;
		var b = opass.value;
		var c = oyzm.value;
		if(myArr.includes(a) && myArr.includes(b) && myArr.includes(c)){
			console.log("登录成功")
			location = "index.html"
		}else{
			alert("用户名或者密码错误")
		}
		
    }
}
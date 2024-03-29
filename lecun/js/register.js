//生成验证码
//页面加载时，生成随机验证码
var prove_btn = document.getElementById("prove_btn")
    window.onload=function(){
     createCode(4);
    }
	prove_btn.onclick = function(){
		createCode(4);
	}
    //生成验证码的方法
    function createCode(length) {
        var code = "";
        var codeLength = parseInt(length); //验证码的长度
        var prove_r = document.getElementById("prove_r");//获取显示区域
        ////所有候选组成验证码的字符，当然也可以用中文的
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 
        //循环组成验证码的字符串
        for (var i = 0; i < codeLength; i++){//生成0,1,2,3
            //获取随机验证码下标
            var charNum = Math.floor(Math.random() * 62);//生成1,2,3,...,61
			//console.log(charNum)//因为在0,1,2,3的循环里会产生4位随机数
            //组合成指定字符验证码
            code += codeChars[charNum];//因为在0,1,2,3的循环里会产生4位随机数的下标,此时code就是4位验证码
        }
        if (prove_r){

            //将生成验证码赋值到显示区
            prove_r.value = code;//把生成的4位验证码添加到显示区域
        }
    }
    


//表单验证
		var ouser = document.getElementById("user")
		var opass = document.getElementById("pass")
		var opassEnd = document.getElementById("passEnd")
		var otel = document.getElementById("tel")
		var obtn = document.getElementById("btn")
		var oyzm = document.getElementById("prove")
		var oprove_r = document.getElementById("prove_r")
		
		
		var user=pass=yzm=tel=0;
		
		ouser.onblur = function(){
		    var reg = /^(?!\d+$)[\da-zA-Z_]{6,20}$/;
		    if(reg.test(this.value)){
		        this.nextElementSibling.innerHTML = "成功";
		        user = 1;
		    }else{
		        this.nextElementSibling.innerHTML = "用户名不可用";
				alert("用户名错误请输入、字母、数字、“-”“_”的组合，6-20个字符");
		        user = 0;
		    }
		}
		opass.onblur = function(){
		    var reg = /^.{6,20}$/;
		    if(reg.test(this.value)){
		        this.nextElementSibling.innerHTML = "成功";
		        pass = 1;
		    }else{
		        this.nextElementSibling.innerHTML = "密码不可用";
				alert("密码错误请输入字母、数字、“-”“_”的组合，6-20个字符");
		        pass = 0;
		    }
		}
		opassEnd.onblur = function(){
		    if(opassEnd.value === opass.value){
		        this.nextElementSibling.innerHTML = "密码可用";
		        pass = 1;
		    }else{
		        this.nextElementSibling.innerHTML = "密码不一致";
				alert("密码不一致");
		        pass = 0;
		    }
		}
		otel.onblur = function(){
		    var reg = /^1[3-9]\d{9}$/;
		    if(reg.test(this.value)){
		        this.nextElementSibling.innerHTML = "成功";
		        tel = 1;
		    }else{
		        this.nextElementSibling.innerHTML = "不是手机号";
				alert("电话错误");
		        tel = 0;
		    }
		}
		
		oyzm.onblur = function(){
		    
		    if(oyzm.value === oprove_r.value){
		        this.nextElementSibling.innerHTML = "验证码正确";
		        yzm = 1;
		    }else{
		        this.nextElementSibling.innerHTML = "请输入验证码";
				alert("验证码错误");
		        yzm = 0;
		    }
		}
		
		var codes = 0;
	obtn.onclick = function(){
		if(user && pass && yzm && tel){
			alert("注册成功");

			setData();
			location = "sigin.html"
		}
		if(user == 0){
			alert("用户名错误");
		} 
		if(pass == 0){
			alert("密码错误");
			console.log(1)
		}
		if(tel == 0){
			alert("电话错误");
		} 
		if(yzm == 0){
			alert("验证码错误");
		}
	}
	

	
	
	function setData(){
            // console.log(this.id);
            // 保存多个商品，数量，一条本地存储
            // 数组中放对象的形式处理数据
            // 每个对象是一个商品
            // 整个数组是一条本地存储
            // [{id:"adsa",num:1},{},{}]

            this.goods = localStorage.getItem("goods");//82行--89行执行了后，在这里获取存的本地存储

            if(this.goods){//如果本地存储没有goods就执行82行的代码
                // 不是第一次
                this.goods = JSON.parse(this.goods)//57行获取到了后进行转对象

                var onoff = true;
                // 之后存
                for(var i=0;i<this.goods.length;i++){
                    // 老的
                    if(this.goods[i].name == this.ouser.value){
                        onoff = false;
                        alert("用户名重复")
                    }
                }
                // 新的
                if(onoff){
                    this.goods.push({
                    	name:ouser.value,
			    		password:opassEnd.value
                    })
                }
            }else{
                // 第一次存
                //     直接存
                this.goods = [{//把第一次准备存的id和数量存到本地存储里面89行
                    name:ouser.value,
			    	password:opassEnd.value
                }];
            }
            
            // 最后将数据设置回去
            localStorage.setItem("goods",JSON.stringify(this.goods))
        }
//生成验证码
		var oyzm = document.getElementById("prove")
		var oprove_r = document.getElementById("prove_r")
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
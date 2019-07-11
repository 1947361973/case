// 三级菜单
$(function(){
	$(".ul1").has(".li1").css("display","none")
	$(".ul2").has(".li2").css("display","none")
	$(".navMenu").has(".ul1").mouseover(function(){
		$(this).children(".ul1").css("display","block");
		$(".banner").css("z-index","-1")
	}).mouseout(function(){
        $(this).children(".ul1").css("display","none");
		$(".banner").css("z-index","")//这里是不让banner遮挡
    })
	
    $("li").has("ul").mouseover(function(){
        $(this).children("ul").css("display","block");
    }).mouseout(function () {
        $(this).children("ul").css("display","none");
    })
})	

// 楼层效果
$("#floors").children("li").click(function(){
	
	//获取点击的索引
	var index = $(this).index();
	//根据索引获取对应的楼层
	var iNowFloor = $(".floor").eq(index);
	//计算楼层距离顶部的位置
	var t = iNowFloor.offset().top;
	//将这个位置设置给滚动条
	$("html").stop().animate({
		scrollTop:t
	})
})

//轮播图
function Banner(){
	this.left = document.getElementById("left");
	this.right = document.getElementById("right");
	this.items = document.querySelectorAll(".banner a");
			
//			表示要进来的
	this.index = 0;
//			表示要走的
	this.iPrev = this.items.length-1;
			
	this.init()
}
	Banner.prototype.init = function(){
	var that = this;
	this.left.onclick = function(){
//				计算索引,同时传方向
	that.changeIndex(-1)
	}
	this.right.onclick = function(){
//				计算索引,同时传方向
	that.changeIndex(1)
	}
	}

Banner.prototype.changeIndex = function(direct){
//			根据方法,决定计算索引的方式
	if(direct == -1){
	if(this.index == 0){//当index为0 
		this.index = this.items.length-1;//点击左边按钮index值就变为了length-1
		this.iPrev = 0;
		}else{
			this.index--;//当index不为0则--
			this.iPrev = this.index + 1;
			}
	}else{
		if(this.index == this.items.length - 1){//当index为length-1 
			this.index = 0;//点击右边按钮index值就变为0
			this.iPrev = this.items.length-1;
		}else{
			this.index++;//当index不为0则++
			this.iPrev = this.index - 1;
			}
		}
//			console.log(this.iPrev,this.index)
//			开始移动图片,同时传入方向
			this.display(direct)
}
Banner.prototype.display = function(direct){
//			从哪走
	this.items[this.iPrev].style.left = 0;
//			走到哪
	move(this.items[this.iPrev],{left:-this.items[0].offsetWidth*direct})
			
//			从哪进来
	this.items[this.index].style.left = 768 * direct + "px";
//			进到哪
	move(this.items[this.index],{left:0})
}
	new Banner();
	
// 自动点击左按钮

var dong = setInterval(function(){
	$("#left").triggerHandler("click")
},2500)


	// 滚动新闻
class Slid{
	constructor(){
		this.slide=document.getElementById("slide");
		this.slide1=document.getElementById("slide1");
		this.slide2=document.getElementById("slide2");
		slide2.innerHTML=slide1.innerHTML
		
		this.roll()
	}
	roll(){
		setInterval(function Marquee(){
			if(slide2.offsetTop-slide.scrollTop<=0){
				slide.scrollTop-=slide1.offsetHeight
			}else{
				slide.scrollTop++
			}
		},40)
		this.state()
	}
	state(){
		slide.onmouseover=function(){clearInterval(MyMar)}
		slide.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
	}
}
new Slid();



//将用户名替换到首页
var goods = localStorage.getItem("goods"); //接收本地存储的数据
//console.log(goods)
var goodss = JSON.parse(goods) //转成对象的格式
for (let i = 0; i < goodss.length; i++) { //遍历对象数组
    //console.log(goodss[i].name) //打印用户名
    window.onload = function(){
    	var on = document.getElementById("on")
    	var on2 = document.getElementById("on2")
		
    	this.on.innerHTML = goodss[i].name//将获取到的用户名替换到首页顶端的位置
    	// this.on2.innerHTML = `HI ${goodss[i].name} 您好`//将获取到的用户名替换到首页顶端的位置
    }
}

//选项卡功能、、、图片切换
$("#card").find("ul li").click(function(){
	let i = $(this).index();//索引0，1，2，3
	console.log(i)
	$("dl").children("dd").removeClass("active").eq(i+1).addClass("active");
})






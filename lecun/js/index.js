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
setInterval(function(){
	$("#left").triggerHandler("click")
},1000)


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




var goods = localStorage.getItem("goods"); //接收本地存储的数据
//console.log(goods)
var goodss = JSON.parse(goods) //转成对象的格式
for (let i = 0; i < goodss.length; i++) { //遍历对象数组
    //console.log(goodss[i].name) //打印用户名
    window.onload = function(){
    	var on = document.getElementById("on")
    	var on2 = document.getElementById("on2")
		console.log(goodss[i].name)//打印用户名
    	this.on.innerHTML = goodss[i].name//将获取到的用户名替换到首页顶端的位置
    	// this.on2.innerHTML = `HI ${goodss[i].name} 您好`//将获取到的用户名替换到首页顶端的位置
    }
}


class GoodsList{
        constructor(){
            this.cont = document.getElementById("goodss");
			this.agoods = [{
			    "src":"https://img.lecuntao.com/data/upload/shop/store/goods/476/2018/03/20/476_05748880204432408_240.jpg",
			    "name":"家居日用产品",
			    "hot":"买一送一",
			    "goodsId":"jiaju_1"
			},{
			    "src":"https://img.lecuntao.com/data/upload/shop/store/goods/4822/2019/05/30/4822_06125335398306835_240.jpg",
			    "name":"家居日用产品",
			    "hot":"买一送一",
			    "goodsId":"jiaju_2"
			},{
			    "src":"https://img.lecuntao.com/data/upload/shop/store/goods/3739/2017/12/11/3739_05663083155368436_240.png",
			    "name":"家居日用产品",
			    "hot":"买一送一",
			    "goodsId":"jiaju_3"
			},{
			    "src":"https://img.lecuntao.com/data/upload/shop/store/goods/4736/2018/07/31/4736_05863774636661489_240.jpg",
			    "name":"家居日用产品",
			    "hot":"买一送一",
			    "goodsId":"jiaju_4"
			},{
			    "src":"https://img.lecuntao.com/data/upload/shop/store/goods/4764/2019/05/15/4764_06112303848940358_240.jpg",
			    "name":"家居日用产品",
			    "hot":"买一送一",
			    "goodsId":"jiaju_5"
			},{
			    "src":"https://img.lecuntao.com/data/upload/shop/store/goods/4736/2018/08/04/4736_05866945112622830_240.jpg",
			    "name":"家居日用产品",
			    "hot":"买一送一",
			    "goodsId":"jiaju_6"
			}]
			this.display();
        }
        
        display(){
            let str = "";
			for(var i=0;i<this.agoods.length;i++){
				str +=  `<li>
							<p>${this.agoods[i].name}</p>
							<span>${this.agoods[i].hot}</span>
							<a href="#"><img src="${this.agoods[i].src}" ></a>
						</li>`
			}
			this.cont.innerHTML = str;
        }
    }
    new GoodsList();





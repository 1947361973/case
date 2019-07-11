class Page{
	constructor(options){
		this.main_l = document.querySelector("#main");
		this.url = options.url;
		
		this.init();
		this.addEvent();
	}
	addEvent(){
            var that = this;
            this.main_l.onclick = function(eve){//事件委托
                var e = eve || window.event;
                var t = e.target || e.srcElement;
                if(t.className == "car"){
                	
                    // 2.获取当前的商品ID
                    that.id = t.parentNode.parentNode.parentNode.getAttribute("index");//当点击到商品上时候，可以获取到整个商品的对象的id
                    console.log(that.id)
                    // 3.存localstorage
                    that.setData();
                }
                if(t.className == "pay"){
                	location="che.html"
                }
            }
        }
	setData(){
            // console.log(this.id);
            // 保存多个商品，数量，一条本地存储
            // 数组中放对象的形式处理数据
            // 每个对象是一个商品
            // 整个数组是一条本地存储
            // [{id:"adsa",num:1},{},{}]

            this.cargoods = localStorage.getItem("cargoods");

            if(this.cargoods){
                // 不是第一次
                this.cargoods = JSON.parse(this.cargoods)

                var onoff = true;
                // 之后存
                for(var i=0;i<this.cargoods.length;i++){
                    // 老的
                    if(this.cargoods[i].id == this.id){
                        this.cargoods[i].num++;//当本地存储存在点击的id时候就直接加商品数量
                        onoff = false;
                        console.log(this.id)
                    }
                }
                // 新的
                if(onoff){
                    this.cargoods.push({
                        id:this.id,//此时本地存储已经有了goods这个json，可以直接用数组的方法push在数组中添加商品数据
                        num:1
                        
                    })
                }
            }else{
                // 第一次存
                //     直接存
                this.cargoods = [{//把第一次准备存的id和数量存到本地存储里面89行
                    id:this.id,
                    num:1
                }];
                
            }
            
            // 最后将数据设置回去
            localStorage.setItem("cargoods",JSON.stringify(this.cargoods))
        }
	init(){
            var that = this;
            ajax({
            	type:"post",
            	url:this.url,
            	success:function(res){
            		that.res = JSON.parse(res);
            		that.getData();
            		new Magnifier();
            		$(".img_b").children(".img2").click(function(){
						let i = $(this).index();//点击底部小图的索引0，1，2，3，4
						$(".b_box").children("img").attr("src","img/xq8"+i+".jpg")//点击修改右边大图的图片的src的路径实现切换图片
						$(".s_box").children(".img1").removeClass("active").eq(i).addClass("active");//切换左边主图
					})

            	}
            })
    }
	getData(){//获取本地存储中的商品数组，如果本地存储有那就是他本身，如果没有就接收一个空数组
            this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
			
            this.display();    
    }
	display(){
            var str = "";
            for(var i=0;i<this.res.length;i++){//遍历res商品库数组
//              for(var j=0;j<this.goods.length;j++){//遍历本地存储的数组,因为本地存储只有一个id,所以不用遍历
//              }
                    if(this.res[i].goodsId == this.goods[0].id){//比较确认本地存储的产品是不是产品库中的产品再渲染
                  
                        str = `<div class="main-c"  index="${this.res[i].goodsId}">
									<div class="main_l">
										<div class="s_box">
											<img class="img1 active" src="${this.res[i].src}"/>
											<img class="img1" src="${this.res[i].src1}"/>
											<img class="img1" src="${this.res[i].src2}"/>
											<img class="img1" src="${this.res[i].src3}"/>
											<img class="img1" src="${this.res[i].src4}"/>
											<span class = "span"></span>
											<p></p><!--为了解决在js中的移动闪烁问题-->
										</div>
										<div class="b_box">
											<img src="${this.res[i].src0}"/>
										</div>
										<div class="img_b">
											<img class="img2" src="${this.res[i].src60}" >
											<img class="img2" src="${this.res[i].src61}" >
											<img class="img2" src="${this.res[i].src62}" >
											<img class="img2" src="${this.res[i].src63}" >
											<img class="img2" src="${this.res[i].src64}" >
										</div>
									</div>
									<div class="main_r">
										<h3 class="name">${this.res[i].name}</h3>
										<h4 class="hot">宝贝热卖中限时抢购</h4>
										<b class="price1">￥${this.res[i].price}</b><br>
										<span class="price2"><s>￥${this.res[i].price2}</s></span>
										<div class="buttn">
											<p class="car">加入购物车</p>
											<p id="pay" class="pay">立即购买</p>
										</div>
									</div>
								</div>`
                    }
            }
            this.main_l.innerHTML = str;
    }
}
new Page({
	url:"http://localhost/lecun/data/goods.json"
});


//放大镜
function Magnifier(){
//				获取元素
		this.sBox = document.querySelector(".s_box");//左边图框
		this.span = document.querySelector(".s_box span");//左边的滑块
		this.sImg = document.querySelector(".s_box .img1");//左边的图片
		this.bBox = document.querySelector(".b_box");//右边图框
		this.bImg = document.querySelector(".b_box img");//右边的大图
//				绑定事件
		this.addEvent();
		this.bBox.style.display = "block";
}
Magnifier.prototype.init = function(){
//				右边大图的宽高  除以  右边框的宽高  得到比例
	var w = this.bImg.offsetWidth / this.bBox.offsetWidth;
	var h = this.bImg.offsetHeight / this.bBox.offsetHeight;
//				左边框的宽高  除以  比例  得到  span的宽高
	this.span.style.width = this.sBox.offsetWidth / w + "px";
	this.span.style.height = this.sBox.offsetHeight / h + "px";
}
Magnifier.prototype.addEvent = function(){
	var that = this;
//				进入
	this.sBox.addEventListener("mouseover",function(){
		that.over()
//					补充布局:因为元素被display:none了，js获取不到隐藏的元素的尺寸
		that.init()
	})
//				离开
	this.sBox.addEventListener("mouseout",function(){
		that.out()
	})
//				移动
	this.sBox.addEventListener("mousemove",function(eve){
		var e = eve || window.event;
		that.move(e);
	})
}
Magnifier.prototype.over = function(){//鼠标进入左边图中，滑块block，左边图片opacity0.6，右边的图框block
	this.span.style.display = "block";
	this.sImg.style.opacity = "1";
	this.bBox.style.display = "block";
	this.bImg.style.display = "block";
	
}
Magnifier.prototype.out = function(){
	this.span.style.display = "none";
	this.sImg.style.opacity = "1";
	this.bBox.style.display = "none";
	
}
Magnifier.prototype.move = function(e){
//				span跟随移动
//				利用尺寸的计算
//				this.span.style.left = e.clientX - this.span.offsetWidth/2 - this.sBox.offsetLeft + "px";
//				this.span.style.top = e.clientY - this.span.offsetHeight/2 - this.sBox.offsetTop + "px";
//				利用布局解决
	var l = Math.round(e.offsetX - this.span.offsetWidth/2);
	var t = Math.round(e.offsetY - this.span.offsetHeight/2);
//				边界限定
	if(l < 0) l=0;
	if(t < 0) t=0;
	if(l > 240){l = 240}
	if(t > 240){t = 240}
//				计算比例
	var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
	var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);
	
//				让span跟随鼠标
	this.span.style.left = l + "px";
	this.span.style.top = t + "px";
	
//				根据比例移动大图
	this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
	this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
	
//				设置span的背景图的位置，跟随鼠标反方向移动
	this.span.style.backgroundPosition = -l + "px "+ -t +"px";
}
//onload = function(){
//	new Magnifier()
//}

//选项卡功能、、、图片切换
//$(".img_b").children(".img2").click(function(){
//	let i = $(this).index();//点击底部小图的索引0，1，2，3，4
//	$(".b_box").children("img").attr("src","img/xq8"+i+".jpg")//点击修改右边大图的图片的src的路径实现切换图片
//	$(".s_box").children(".img1").removeClass("active").eq(i).addClass("active");//切换左边主图
//})






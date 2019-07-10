
class GoodsList{
	constructor(){
		this.ocont = document.getElementById("cont");
		this.url = "http://localhost/lecun/data/goods.json";
		//初始页面刷新
        this.init();
        this.addEvent();
	}
	addEvent(){
            var that = this;
            this.ocont.onclick = function(eve){//事件委托
                var e = eve || window.event;
                var t = e.target || e.srcElement;
                if(t.className == "addCar"){
                    // 2.获取当前的商品ID
                    that.id = t.parentNode.getAttribute("index");//当点击到商品上时候，可以获取到整个json商品的对象的id
                    // 3.存localstorage
                    that.setData();
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

            this.goods = localStorage.getItem("goods");//82行--89行执行了后，在这里获取存的本地存储

            if(this.goods){//如果本地存储没有goods就执行82行的代码
                // 不是第一次
                this.goods = JSON.parse(this.goods)//57行获取到了后进行转对象

                var onoff = true;
                // 之后存
                for(var i=0;i<this.goods.length;i++){
                    // 老的
                    if(this.goods[i].id == this.id){
//                      this.goods[i].num++;//当本地存储存在点击的id时候就直接加商品数量
                        onoff = false;
                    }
                }
                // 新的
                if(onoff){
                    this.goods.push({
                        id:this.id,//此时本地存储已经有了goods这个json，可以直接用数组的方法push在数组中添加商品数据
                    })
                }
            }else{
                // 第一次存
                //     直接存
                this.goods = [{//把第一次准备存的id和数量存到本地存储里面89行
                    id:this.id,
                }];
            }
            
            // 最后将数据设置回去
            localStorage.setItem("goods",JSON.stringify(this.goods))
        }
	init(){
		var that = this;
		ajaxPost(this.url,function(res){
                that.res = JSON.parse(res);
                that.display()
            })
	}
	display(){//把接收到的res进行字符拼接渲染到页面
            var str = "";
            for(var i=0;i<this.res.length;i++){
                str += `<li index="${this.res[i].goodsId}">
							<a href="#"><img src="${this.res[i].src}" ></a>
							<p>
								<em class="sale-price">${this.res[i].price}</em>
								<em class="market-price">${this.res[i].price2}</em>
							</p>
							<h4>${this.res[i].name}</h4>
							<span id="car"  class="addCar">点击购买</span>
						</li>`;
            }
            this.ocont.innerHTML = str;
        }
}
new GoodsList;


//class Car{
//	constructor(){
//		this.ocont = document.getElementById("cont");
//		this.addEvent();
//	}
//	addEvent(){
//          var that = this;
//          this.ocont.onclick = function(eve){//事件委托
//              var e = eve || window.event;
//              var t = e.target || e.srcElement;
//              if(t.className == "addCar"){
//                 location = "page.html"
//              }
//          }
//  }
//}
//new Car();

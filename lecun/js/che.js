class Che{
	constructor(){
		this.tbody = document.querySelector("tbody");
		this.sum = document.getElementById("priceTotal");
		this.url = "http://localhost/lecun/data/goods.json";
		this.init();
		this.addEvent();
		
	}
	addEvent(){
            var that = this;
            this.tbody.onclick = function(){//通过事件委托来找到删除按钮
                if(event.target.className == "delete"){
                    // 2.获取点击商品的id
                    that.id = event.target.parentNode.parentNode.getAttribute("index");//当点击到商品上时候，可以获取到整个商品的对象的id，
                    // 3.删除DOM元素、、删除按钮的父级是tr元素然后进行删除一行
                    event.target.parentNode.parentNode.remove();
//                  console.log(this.cargoods)
                    // 4.删除localstorage的数据
                    that.setData(function(i){
                        that.cargoods.splice(i,1);
                    });
                    
                }
                
            }
            // 8.修改数量：事件委托绑定输入框的事件
            this.tbody.oninput = function(){
            	
                if(event.target.className == "count-input"){
                	
                    // 9.存储修改的商品的id
                    that.id = event.target.parentNode.parentNode.getAttribute("index");//这个id用来更新55行的，再去执行setData（）函数的时候用来判断的
                    // 10.修改localstorage的数据
                    that.setData(function(i){
                        that.cargoods[i].num = event.target.value;
                    });
                }
            }
        }
	setData(callback){
            // 5.遍历数据，查找相同id
            
            for(var i=0;i<this.cargoods.length;i++){
                if(this.cargoods[i].id == this.id){
                    // 6.执行回调函数：删除时传进来的是删除，修改时传进来的是修改
                    callback(i);
                }
            }
            // 7.再存回去
            localStorage.setItem("cargoods",JSON.stringify(this.cargoods));
        }
	total(){
		        //事件委托，找到当前改变的数据，渲染其他数据
		    
            var that = this;
            this.tbody.onchange = function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className == "count-input"){//在商品数量发生改变时候修改小计的金额
                    that.num = target.value; 
                    target.parentNode.nextElementSibling.innerHTML = (that.num * parseFloat(target.parentNode.previousElementSibling.innerHTML)).toFixed(2);
                   
                }
                that.opay();//商品数量发生改变时根据计算出来的小计来计算总金额函数
                that.shuliang();
            }
	}
	//计算合计结算金额
	opay(){
            var s = 0;
            var heji = document.querySelectorAll(".subtotal");
            for(var i=0;i<heji.length;i++){
            	s += parseFloat(heji[i].innerHTML);
            }
        	this.sum.innerHTML = parseFloat(s).toFixed(2);
	}
	shuliang(){
		var he = document.querySelector("#selectedTotal")
		var s = 0;
		var shu = document.querySelectorAll(".count-input");
		for(var i=0;i<shu.length;i++){
            	s += Number(shu[i].value);
            	console.log(shu[i].value)
            }
		he.innerHTML = s;
	}
	init(){
            var that = this;
            ajaxPost(this.url,function(res){
                that.res = JSON.parse(res)
                that.getData();
            })
        }
    getData(){//获取本地存储中的商品数组，如果本地存储有那就是他本身，如果没有就接收一个空数组
            this.cargoods = localStorage.getItem("cargoods") ? JSON.parse(localStorage.getItem("cargoods")) : [];
            this.display();    
        }
    display(){
            var str = "";
            for(var i=0;i<this.res.length;i++){//遍历res商品库数组
                for(var j=0;j<this.cargoods.length;j++){//遍历本地存储的数组
                    if(this.res[i].goodsId == this.cargoods[j].id){//比较确认本地存储的产品是不是产品库中的产品再渲染
                        str += `<tr index="${this.res[i].goodsId}">
									<td class="checkbox"><input class="check-one check" type="checkbox" /></td>
									<td class="goods"><img src="${this.res[i].src}" /><span>${this.res[i].name}</span></td>
									<td class="price">${this.res[i].price}</td>
									<td class="count">
										<input class="count-input" type="number" value="${this.cargoods[j].num}" min = "1"/>
										</td>
									<td class="subtotal">${this.cargoods[j].num * this.res[i].price}</td>
									<td class="operation"><span class="delete">删除</span></td>
								</tr>`
                        
                    }
                }
            }
            this.tbody.innerHTML = str;
            
            this.total();//事件委托计算小计
            this.opay();//刷新时候计算总金额
            this.shuliang();//刷新时候计算数量
        }
}

new Che();


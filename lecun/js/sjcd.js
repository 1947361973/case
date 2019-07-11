//// 三级菜单
//window.onload = function(){
//	$(".ul1").has(".li1").css("display","none")
//	$(".ul2").has(".li2").css("display","none")
//	$(".navMenu").has(".ul1").mouseover(function(){
//		$(this).children(".ul1").css("display","block");
//	}).mouseout(function(){
//      $(this).children(".ul1").css("display","none");
//  })
//	
//  $("li").has("ul").mouseover(function(){
//      $(this).children("ul").css("display","block");
//  }).mouseout(function () {
//      $(this).children("ul").css("display","none");
//  })
//}


$(document).ready(function(){
    $(".ul1").has(".li1").css("display","none")
	$(".ul2").has(".li2").css("display","none")
	$(".navMenu").has(".ul1").mouseover(function(){
		$(this).children(".ul1").css({display:"block"});
	}).mouseout(function(){
        $(this).children(".ul1").css("display","none");
    })
	
    $("li").has("ul").mouseover(function(){
        $(this).children("ul").css("display","block");
    }).mouseout(function () {
        $(this).children("ul").css("display","none");
    })
})



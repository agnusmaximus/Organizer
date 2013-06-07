$(function() {

	$("#box, #footbox").hide().delay(100).fadeIn(500, function(event){
		$("#email").focus();
	});

	$("#helpb").click(function(event) {
		$("#tlogin").css("display","none");
		$("#thelp").css("display","block");
		$("#login").css("display","none");
		$("#help").css("display","block");
		$("#blogin").css("display","none");
		$("#bhelp").css("display","block");
		$(".incontent").animate({scrollTop:0}, 0);
		$("#user").focus();
	});

	$("#lbackb").click(function(event) {
		$("#tlogin").css("display","block");
		$("#thelp").css("display","none");
		$("#login").css("display","block");
		$("#help").css("display","none");
		$("#blogin").css("display","block");
		$("#bhelp").css("display","none");
		$(".incontent").animate({scrollTop:0}, 0);
		$("#user").focus();
	});

	$(".preinput").click(function(event) {
		$(this).children("input").select();
	});

	$("input, textarea").focus(function(event){
		$(this).parent().addClass("glow");
	}).blur(function(event){
		$(this).parent().removeClass("glow");
	});

	$("#email").focus();

});
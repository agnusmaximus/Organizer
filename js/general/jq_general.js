$(function() {

	// Stylesheet Resize
	function adjustStyle(width) {
		width = parseInt(width);
		if (width < 1001) { $("#size-stylesheet").attr("href", "/rsrc/mobile.css");
		} else { $("#size-stylesheet").attr("href", "/rsrc/stylesheet.css"); }
	}
	adjustStyle($(this).width());
	$(window).resize(function() { adjustStyle($(this).width()); });
	

	// glow own input and textarea
	$("input, textarea").live("focus", function(event){
		$(this).addClass("glow");
	}).blur(function(event){
		$(this).removeClass("glow");
	});

	$("#searchbar input").live("focus", function(event){
		$(this).addClass("select");
	}).blur(function(event){
		$(this).removeClass("select");
	});
	
	

	$("#npsth-wrp").find("input").focus(); //on document ready, autofucus add-new-todo

	$("#npsth-wrp").live("click", function(event){ $(this).find('input').focus(); }); // add-new-todo input focused on click
	$("#newpstask-tail").live("click", function(event){ $(this).find('textarea').focus(); }); // new-todo-desc textarea focused on click

	// check to clear placeholder text over add-new-todo
	$("#npsth-wrp").find("input").focus(function(event){
		$("#npsth-wrp").addClass("afocused");
		$("#npsth-plc").hide();
	}).blur(function(event){
		$("#npsth-wrp").removeClass("afocused");
		if( $("#npsth-wrp").find("input").val().length == 0 ) {
			$("#npsth-plc").show();
		}
	});
	
	$(".str").live("click", function(event){ $(this).find("textarea").focus(); }); // each subtask textarea focus
	$(".dcomtext").live("click", function(event){ $(this).find("textarea").focus(); }); // description textarea focus



	$("#head-logo-title").live("click", function(event){
		event.stopPropagation();
		$('#searchbar').stop().animate({marginTop:0}, 150, function(){
			$(this).children().focus();
		});
		$(this).hide();
		$("#head-logo-title-hover").show();
	});
	
	$("#head-logo-title-hover").live("click", function(event){
		event.stopPropagation();
		$('#searchbar').stop().animate({marginTop:-39}, 150);
		$(this).hide();
		$("#head-logo-title").show();
	});
	
	$("#head-logo-title").live("click", function(event){
		event.stopPropagation();
		$('#searchbar').stop().animate({marginTop:0}, 150, function(){
			$(this).children().focus();
		});
		$(this).hide();
	});

	$("#head-name, #headbutton").live("click", function (event) {
		event.stopPropagation();
		$('#popupbox').stop().fadeToggle('fast');
		$('#headbutton').stop().toggleClass('select');
		$('html').click(function () {
			$('#popupbox').stop().fadeOut('fast');
			$('#headbutton').stop().removeClass('select');
		});
	});
	
	// open new-todo
	$("#nptexpnd").live("click", function(event){
		$('#newpstask-wrapper').addClass("full");
		$('#newpstask-wrapper').animate({padding:30}, 150);
		$('#newpstask-tail').slideDown(150);
		$('#nptclse').show();
		$("#npst-box").find("textarea").select();
		$(this).hide();
	});
	
	// close new-todo
	$(document).on("click", "#nptclse", function(event){
		$('#newpstask-wrapper').removeClass("full");
		$('#newpstask-wrapper').animate({padding:0}, 150);
		$('#newpstask-tail').slideUp(150);
		$('#nptexpnd').show();
		$("#npsth-wrp").find("input").select();
		$(this).hide();
	});


	// equalize the height of the todo button and the todo itself
	$(".atbx").live("mouseenter", function(){
		var newHeight = 0;
		newHeight += $(this).height();
		$(this).find(".atbx-emp, .atbx-sel").height(newHeight);
	}).live("mouseleave", function(){
		$(this).find(".atbx-emp, .atbx-sel").height("auto");
	});

});
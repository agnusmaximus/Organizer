/*
 * Defines the option view, which provides a dropdown list of options
 * for the user to take, such as logging out.
 */

define(['jquery', 'underscore', 'backbone', 'calendarModel', 'text!js/templates/optTemplate.html', 'optModel'],
       function($, _, backbone, calendarModel, optTemplate, optModel) {
	   var optView = 
	       Backbone.View.extend({
					el : $("#opt"),
					
					model : optModel,
					
					template : _.template(optTemplate),
					
					events : {
					    "click #headbutton" : "toggleOpts",
					    "click #bottomboxu" : "logout"
					},
					
					//Initialization consists of rendering the option view
					initialize : function() {
					    this.render();
					},
					
					//Render the option icon using the template
					render : function() {
					    this.$el.html(this.template());
					},
					
					//Toggle the option drop down list
					toggleOpts : function(event) {
					    event.stopPropagation();
					    
					    $('#popupbox').stop().fadeToggle('fast');
					    $('#headbutton').stop().toggleClass('select');
					    $('html').click(function () {
								$('#popupbox').stop().fadeOut('fast');
								$('#headbutton').stop().removeClass('select');
							    });
					},
					
					//Handle logging out
					logout : function(event) {
					    event.stopPropagation();
					    this.toggleOpts(event);
					    
					    this.model.logout();
					}
				    });
	   
	   return new optView();
       });
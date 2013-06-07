define(['jquery', 'backbone', 'underscore', 
	'createTaskModel', 'text!js/templates/createTaskTemplate.html'],
       function($, backbone, _, createTaskModel, createTaskTemplate) {
	   var createTaskView =
	       Backbone.View.extend({
					el : $("#createTaskView"),
					template : _.template(createTaskTemplate),
					model : createTaskModel, 
					events : {
					    "click #createTask" : "createTask",
					    "submit #inputTask" : "createTask"
					},
					
					initialize : function() {
					    this.render();
					},
					
					render : function() {
					    this.$el.html(this.template());
					},

					createTask : function(event) {
					    event.preventDefault();
					    event.stopPropagation();
					    
					    var title = $("#inputText").val();
					    var desc = $("#taskDescription").val();
					    
					    if (title == "") {
						alert("The title can not be blank");
						return;
					    }

					    this.model.createTask(title, desc);

					    $("#inputText").val("");
					    $("#taskDescription").val("");

					    $("#nptclse").trigger("click");
					}
				    });
	   return new createTaskView();
       });
/*
 * Defines the view for a single task that will be combined together
 * to create the overall tasks view in the center of the app
 */
define(['jquery', 'underscore', 'backbone', 'text!js/templates/singleTaskTemplate.html'],
       function($, _, backbone, singleTaskTemplate) {
	   var singleTaskView =
	       Backbone.View.extend({
					template : _.template(singleTaskTemplate),

					events : {
					    "click .atbx-emp" : "finishedTask",
					    "click .atbx-sel" : "redoTask",
					    "click div.atbx" : "selectTask"
					},

					//Initialization includes binding to certain triggers
					//on the model.
					initialize : function() {
					    this.model.bind("destroy", this.selfdestruct, this);				
					    this.model.bind("change", this.render, this);
					},

					//Called whenever the model is destroyed.
					//Signals the view to remove itself from the
					//html
					selfdestruct : function() {
					    this.remove();
					},

					//Attaches the view to a specific element in the list, and renders
					//the template
					render : function() {
					    var idSelector = "#" + this.model.get("TaskID");
					    this.setElement($(idSelector));
					    
					    this.$el.html(this.template({task  : this.model}));
					},

					bounce : function() {
					    this.$el.effect("bounce", {}, "500");
					},

					//Called when the user clicks the checkbox
					//indicating the completion of the task
					finishedTask : function(event) {
					    event.preventDefault();
					    event.stopPropagation();
					    this.model.setDone("1");
					    this.bounce();
					},

					//Called when the user clicks on a selcted checkbox
					//indicating that he's not yet done with this task
					redoTask : function(event) {
					    event.preventDefault();
					    event.stopPropagation();
					    this.model.setDone("0");
					    this.bounce();
					},
					
					//Called when the user clicks on the atbx box,
					//indicating that he wants to inspect this task
					selectTask : function(event) {
					    alert("SelectTask");
					}
				    });
	   return singleTaskView;
       });
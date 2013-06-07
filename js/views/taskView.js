/*
 * Defines the interface for the whole task-list in the middle of the application
 */
define(['jquery', 'underscore', 'backbone', 
	'text!js/templates/taskListTemplate.html', 'taskCollection', 
	'calendarModel'],
       function($, _, backbone, taskListTemplate, 
		taskCollection, calendarModel) {
	  var taskView = 
	       Backbone.View.extend({
					//Set this view's collection to the taskCollection collection
					collection : taskCollection, 			

					//Get its template
					template : _.template(taskListTemplate),

					//Bind to the tdleft element (where the template will
					//be inserted)
					el : $("#taskView"),
					
					//Start by listening to the collection's update trigger
					initialize : function() {
					    this.collection.bind("updated", this.showList, this);
					    this.collection.bind("modelChanged", this.render, this);
					},				
					
					highlight : function() {
					    this.$el.fadeOut(0).fadeIn(300);					    					    
					},
					
					showList : function() {
					    this.render();
					    this.highlight();
					},
					
					//Render
					render : function() {
					    this.$el.html(this.template({tasks : this.collection,
									 month : calendarModel.get("month"),
									 year : calendarModel.get("year"),
									 day : calendarModel.get("curDay"),
									 done : this.collection.areAllDone()}));
					    		  
					    for (var i = 0; i < this.collection.length; i++) {
						this.collection.at(i).trigger("change");
					    }
					}
				    });
	   return new taskView();
       });
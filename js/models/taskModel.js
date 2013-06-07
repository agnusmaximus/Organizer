/*
 * Defines the backend model for a single task item
 */
define(['jquery', 'underscore', 'backbone', 'calendarModel'],
       function($, _, backbone, calendarModel) {
	   var taskModel =
	       Backbone.Model.extend({
					 initialize : function() {
					     
					 },
					 
					 save : function() {					    
					     
					     $.ajax({
							url : "PHP/updateComplete.php",
							type : "POST",
							data : {
							    TaskID : this.get("TaskID"),
							    Done : this.get("Done"),
							    Description : this.get("Description"),
							    Title : this.get("Title")
							}
						    });
					 },

					 setDone : function(d) {
					     this.set("Done", d);
					     this.save();
					 }
				     });
	   return taskModel;
       });
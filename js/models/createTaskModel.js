define(['jquery', 'backbone', 'underscore', 'calendarModel', 'taskCollection'],
       function($, backbone, _, calendarModel, taskCollection) {
	   var createTaskView =
	       Backbone.View.extend({
					initialize : function() {
					    
					},

					createTask : function(title, desc) {
					    $.ajax({
						       url : "PHP/createTask.php",
						       type : "POST",
						       data : {
							   month : calendarModel.get("monthIndex"),
							   day : calendarModel.get("curDay"),
							   year : calendarModel.get("year"),
							   title : title,
							   description : desc
						       },
						       success : function(msg) {
							   taskCollection.update(
							       calendarModel.get("monthIndex"),
							       calendarModel.get("curDay"),
							       calendarModel.get("year")
							   );
						       }
						   });
					}
				    });
	   return new createTaskView();
       });
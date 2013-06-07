/*
 * This is the definition of the whole application's view.  It could be called
 * the whole starting point of the app, since it's the first and only object
 * created by main.js.
 *
 */
define(['jquery', 'underscore', 'backbone', 
	'calendarView', 'optView', 'taskCollection',
        'taskView', 'createTaskView'],
       function($, _, backbone, calendarView, 
		optView, taskCollection,
		taskView, createTaskView) {

	   //Create a new AppView model
	   var AppView = 
	       Backbone.View.extend({	
					//Set this element to the body
					//of the web app
					el : $("body"),
					
					//Initializing the whole application
					initialize : function() {
					    //Listen to changes on the calendar view
					    calendarView.model.bind("dateChanged", this.calendarChanged, this);
					    
					    //this.calendarChanged();
					},
					
					//Whenever the calendar changes dates, send an update notification
					//To the task collection
					calendarChanged : function() {
					    taskCollection.update(calendarView.model.get("monthIndex"),
								  calendarView.model.get("curDay"),
								  calendarView.model.get("year"));
					}
				    });
	   
	   //Return the app view
	   return AppView;
       });
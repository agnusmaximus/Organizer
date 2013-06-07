/*
 * The approuter controlls what to do when certain parameters are appended after
 * a hashmark.
 */
define(['backbone', 'calendarView', 'taskCollection'],
       function(Backbone, calendarView, taskCollection) {
	   //Define the approuter class
	   var AppRouter = 
	       Backbone.Router.extend({
					  //Connect routes to their respective callback
					  //functions
					  routes : {
					      "date/:m/:d/:y" : "changeDate",
					      "*actions" : "defaultRoute"
					  },
					  
					  //Handles what happens when no routes are
					  //matched
					  defaultRoute : function() {
					      
					      //Just set the calendar's date to today
					      calendarView.model.initialize();
					      
					      taskCollection.update(calendarView.model.get("monthIndex"),
								    calendarView.model.get("curDay"),
								    calendarView.model.get("year"));
					  },
					  
					  //The change date function which will
					  //be called whenever the user changes
					  //selected date
					  changeDate : function(m, d, y) {
					      //Update the calendar view's model
					      calendarView.model.setDate(m - 1, d, y);
					  }						      
				      });
	   return AppRouter;
       });
/*
 * Configure require.js
 */
require.config({
		   //Set base url to the directory of the file in which
		   //this script is called
		   baseUrl : '.',
		   
		   //Define dependencies and export aliases
		   shim: {
		       'underscore': {
			   exports: '_'
		       },
		       'backbone': {
			   deps: [
			       'underscore',
			       'jquery'
			   ],
			   exports: 'Backbone'
		       }
		   },
		   

		   //Set some aliases
		   paths : {
		       //These aliases will all be those of libraries
		       jquery : "js/libs/jquery/jquery.min",
		       underscore : "js/libs/underscore/underscore-min",
		       backbone : "js/libs/backbone/backbone",
		       text : "js/libs/require/text",

		       //These aliases will be part of the application
		       calendarView : "js/views/calendarView",
		       calendarModel : "js/models/calendarModel",
		       optView : "js/views/optView",
		       optModel : "js/models/optModel",
		       taskCollection : "js/collections/taskCollection",
		       taskView : "js/views/taskView",
		       singleTaskView : "js/views/singleTaskView",
		       taskModel : "js/models/taskModel",
		       createTaskView : "js/views/createTaskView",
		       createTaskModel : "js/models/createTaskModel"
		   }
	       });

/*
 * Start our application 
 */
require(['js/views/appView', 'js/routers/appRouter', 'backbone'], 
	function(AppView, AppRouter) {

	    //Create a new app view
	    var newApp = new AppView;

	    //Create a new app router
	    var newRouter = new AppRouter;

	    //Start history
	    Backbone.history.start();
	});
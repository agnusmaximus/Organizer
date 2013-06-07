/*
 * Defines the collection of tasks that will be displayed in the middle section
 * of Organizer
 */
define(['jquery', 'backbone', 'underscore', 'taskModel', 'singleTaskView'],
      function($, backbone, _, taskModel, singleTaskView) {
	  var taskCollection = 
	      Backbone.Collection.extend({
					     
					     //Initialize the collection
					     initialize : function() {
						 this.on("change:Done", this.modelChanged, this);
					     },

					     modelChanged : function() {
						 this.trigger("modelChanged");
					     },
					     
					     //Called whenever the calendar view is updated,
					     //that way the todo list can be updated based on
					     //the new date
					     update : function(m, d, y) {
						 
						 this.reset();
						 
						 //Store a global reference to this collection
						 var self = this;

						 //Call a php file to fetch data
						 $.ajax({
							    url : "PHP/getTasks.php",
							    type : "POST",
							    data : {month : m, day : d, year : y},
							    success : function(jsonObj) {

								//Convert the json encoded string into
								//an array of tasks to be displayed
								var tasks = JSON.parse(jsonObj);
								
								//If there are no tasks, update the view, and return
								if (tasks == null) {
								    self.trigger("updated");
								    return;
								}

								//Loop through the array of tasks, creating
								//task models, and binding them to new views
								for (var i = 0; i < tasks.length; i++) {
								    
								    //Create the new model
								    var newModel = new taskModel({
												     TaskID : tasks[i]['TaskID'],
												     Done : tasks[i]['Done'],
												     Title : tasks[i]['Title'],
												     Description : tasks[i]['Description']
												 });
								    
								    
								    //Create the a new task view from the new model
								    var newSingleTaskView = new singleTaskView({model : newModel});
								    
								    //Add the model to this collection (self)
								    self.add(newModel);
								}
								self.trigger("updated");
							    }								
							});
					     },

					     areAllDone : function() {
						 var isDone = 1;

						 for (var i = 0; i < this.length; i++) {
						     if (this.at(i).get('Done') == '0') {
							 isDone = 0;
							 break;
						     }
						 }

						 return isDone;
					     }
					 });
	  
	  //Modify the add method of the collection to avoid duplicates
	  taskCollection.prototype.add = function(newTask) {
	      var isDupe = this.any(function(anyTask) {
					return anyTask.get("TaskID") === newTask.get("TaskID");
				    });

	      if (isDupe) return false;
	      Backbone.Collection.prototype.add.call(this, newTask);	      
	  }
	  
	  return new taskCollection();
      });
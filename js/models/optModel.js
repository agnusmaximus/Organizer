/*
 * Defines the model class which will handle the
 * backend functionality of the options list
 */
define(['jquery', 'underscore', 'backbone'],
       function($, _, backbone) {
	   var optModel = 
	       Backbone.Model.extend({
					 //Initialization does not do anything
					 initialize : function() {
					 },
					 
					 //Logout by sending a post request to
					 //the server, which clears session variables
					 logout : function() {
					     $.ajax({
							url : "PHP/logout.php",
							type : "post",
							success : function() {
							    window.location = "index.php";
							}
						    });
					 }
				     });
	   return new optModel();
       });
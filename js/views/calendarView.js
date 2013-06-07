/*
 * Defines the calendar view which will be the user's main way of controlling
 * which day's assignments to see
 */
define(['jquery', 'underscore', 'backbone', 'calendarModel', 'text!js/templates/calendarTemplate.html'],
       function($, _, backbone, calendarModel, calendarTemplate) {
	   var calendarView = 
	       Backbone.View.extend({
					//Set the calendar view's model to the calendar model
					model : calendarModel, 

					//Listen only to the navigation input form
					events : {
					    'submit #calendarNav' : 'navigateToDate'
					},
					
					//Initialize the calendar's template
					template : _.template(calendarTemplate),
					
					//Set view's element context
					el : $("#precontent"),
					
					//Initialize the calendar view
					initialize : function() {
					    this.model.on('change', this.render, this);
					    this.render();					    
					},

					//The render function uses the html template to generate
					//a visual calendar given the model's data
					render : function() {

					    //Get offsets
					    var offsetLeft = this.getOffsetFromLeft();
					    var offsetRight = this.getOffsetFromRight();
					    
					    //Create the calendar view
					    this.$el.html(
						this.template({
				    				  offsetLeft : offsetLeft,
				    				  offsetRight : offsetRight,
								  numDays : this.model.get("numDays"),
								  curDay : this.model.get("curDay"),
								  month : this.model.get("month"),
								  year : this.model.get("year"),
								  nextMonth : this.model.get("nextMonth"),
								  previousMonth : this.model.get("previousMonth"),
								  nextMonthIndex : this.model.get("nextMonthIndex"),
								  previousMonthIndex : this.model.get("previousMonthIndex"),
								  monthIndex : this.model.get("monthIndex"),
								  todayMonth : this.model.get("todayMonth"),
								  todayDay : this.model.get("todayDay"),
								  todayYear : this.model.get("todayYear"),
								  nextYear : this.model.get("nextYear"),
								  previousYear : this.model.get("previousYear")
							      })
					    );
					},
					
					//Helper function to find the offset from the left side of the
					//calendar, so that the days align with an actual calendar
					getOffsetFromLeft : function() {
					    var firstDayIndex = this.model.get("firstDayOfMonth");
					    return firstDayIndex * 50 - 1;
					},
					
					//Helper function to find the offset from the right side of
					//the calendar
					getOffsetFromRight : function() {
					    var firstDayIndex = this.model.get("firstDayOfMonth");
					    var numDaysInWeek = this.model.get("numDaysPerWeek");
					    var numDaysInMonth = this.model.get("numDays");
					    
					    return (numDaysInWeek - 
						    (firstDayIndex + 
						     (numDaysInMonth % numDaysInWeek)) % numDaysInWeek) * 50 - 1;
					},
					
					//Given a string navigate to given encoded date
					navigateToDate : function(event) {
					    event.preventDefault();

					    var targetDate = $(event.currentTarget.firstChild).val();

					    window.location.hash = "/date/" + targetDate;					    
					}
				    });
	   
	   //Automatically create an instance of the calendar view
	   return new calendarView();
       });
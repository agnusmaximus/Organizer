/*
 * The calendar Model object represents the data that
 * is encapsulated by the calendar view.
 *
 * It'll determine which day today is, how many days in this month,
 * among other date-things.
 */
define(['jquery', 'underscore', 'backbone'],
       function($, _, backbone) {
	   var calendarModel = 
	       Backbone.Model.extend({
					 
					 //Set default values for variables
					 //like the month names, number of months, number of days in week
					 defaults : {
					     monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
							   "October", "November", "December"],
					     maxMonths : 12,
					     minMonths : 0,
					     numDaysPerWeek : 7,
					     date : 0
					 },
					 
					 //Initialize the variables of the calendar
					 initialize : function() {
					     //Create a javascript date object
					     this.set("date", new Date());

					     //Initialize date
					     this.updateDate();

					     //Set today's date
					     this.set("todayMonth", this.get("date").getMonth());
					     this.set("todayDay", this.get("date").getDate());
					     this.set("todayYear", this.get("date").getFullYear());
					 },

					 updateDate : function() {
					     var dateObj = this.get("date");
					     
					     //Month index
					     var mIndex = dateObj.getMonth();
					     var nextMonthIndex = mIndex + 1, previousMonthIndex = mIndex - 1;
					     
					     //Make sure index isn't beyond bounds
					     if (nextMonthIndex >= this.get("maxMonths")) 
						 nextMonthIndex = 0;
					     if (previousMonthIndex < this.get("minMonths")) 
						 previousMonthIndex = this.get("maxMonths") - 1;

					     this.set("nextMonthIndex", nextMonthIndex);
					     this.set("previousMonthIndex", previousMonthIndex);
					     
					     //Set the current day, how many days in month, current year, month, etc..
					     this.set("curDay", dateObj.getDate());
					     this.set("month", this.get("monthNames")[mIndex]);
					     this.set("year", dateObj.getFullYear());
					     this.set("numDays", this.daysInMonth(dateObj.getMonth(), 
										  dateObj.getFullYear()));
					     this.set("nextMonth", this.get("monthNames")[nextMonthIndex]);
					     this.set("previousMonth", this.get("monthNames")[previousMonthIndex]);
					     this.set("firstDayOfMonth", this.firstDayInMonth(dateObj.getMonth(), 
											      dateObj.getFullYear()));
					     this.set("monthIndex", dateObj.getMonth() + 1);
					     this.set("nextYear", this.get("year"));
					     this.set("previousYear", this.get("year"));

					     //Increment or decrement nextyear/previousyear if month is near at the "edge"
					     if (this.get("monthIndex") == this.get("maxMonths")) {
						 this.set("nextYear", this.get("year") + 1);
					     }

					     if (this.get("monthIndex") == this.get("minMonths") + 1) {	 
						 this.set("previousYear", this.get("year") - 1);
					     }
					 },
					 
					 //Helper function to get number of days in month
					 daysInMonth : function(month, year) {
					     return new Date(year, month + 1, 0).getDate();
					 },
					 
					 //Helper function to get first day of month
					 firstDayInMonth : function(month, year) {
					     return new Date(year, month, 1).getDay();
					 },
					 
					 //Updates curDay to be the passed parameter
					 setCurDay : function(newDay) {
					     this.get("date").setDate(newDay);
					     this.updateDate();
					 },

					 //Updates the month of the date
					 setCurMonth : function(newMonth) {
					     this.get("date").setMonth(newMonth);
					     this.updateDate();
					 },

					 //Update year of the date
					 setCurYear : function(newYear) {
					     this.get("date").setFullYear(newYear);
					     this.updateDate();					   
					 },

					 //Sets month day and year
					 setDate : function(m, d, y) {
					     this.setCurDay(d);
					     this.setCurMonth(m);
					     this.setCurYear(y);
					     this.trigger("dateChanged");
					 }
				     });
	   
	   return new calendarModel();
       });
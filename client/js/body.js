import '../html/body.html';
import '../html/work.html';
import '../html/worklogger.html';
import '../html/login.html';
import { Works } from '../../lib/collections/works.js';

Template.body.events({
  'click #logout'(event) {
    event.preventDefault();
    Meteor.logout(function(err) {
      console.log(err);
    });
  }
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('userBase');
  Meteor.subscribe('works');
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD/MM/YYYY');
});

Template.registerHelper('formatTime', function(date) {
  return moment(date).format('HH:mm');
});

Template.registerHelper('timeSpent', function(start, end) {
  if (start > end) {
    return "00:00";
  }

  var diff = Math.abs(start - end);
  var min = Math.floor( (diff / 1000) / 60);

  return timeConvert(min);
});

Template.registerHelper('getTotalTime', function(start, end) {
  var user = Meteor.user();
  if (user) {
      var minutes = 0;

      Works.find({user: Meteor.user().username}, { sort: { startDate: 1 }}).forEach(function(item) {
        if (item.startDate < item.endDate) {
          var diff = Math.abs(item.startDate - item.endDate);
          minutes += Math.floor( (diff / 1000) / 60);
        }
      });
      return timeConvert(minutes);
  }

  return "00:00";
});

function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ("00" + rhours).slice(-2)  + ":" + ("00" + rminutes).slice(-2);
}

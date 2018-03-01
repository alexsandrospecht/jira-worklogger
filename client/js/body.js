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
  },
  'click #refreshJiraIssues'(event) {
    event.preventDefault();
    loadUserIssues();
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

Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
}

Template.registerHelper('getTotalTime', function(args) {
  var total = 0;

  args.forEach(function (val) {
    var diff = Math.abs(val.startDate - val.endDate);
    total+= Math.floor( (diff / 1000) / 60);
  });

  return moment(args[0].startDate).format('DD/MM/YYYY') + ' - ' + timeConvert(total);
});

function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ("00" + rhours).slice(-2)  + ":" + ("00" + rminutes).slice(-2);
}

import '../html/body.html';
import '../html/work.html';
import '../html/worklogger.html';
import '../html/login.html';

Template.body.events({
  'click #logout'(event) {
    event.preventDefault();
    Meteor.logout(function(err) {
      console.log(err);
    });
  }
});

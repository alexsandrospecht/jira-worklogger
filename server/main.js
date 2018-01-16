import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Meteor.methods({
  'logWork': function (userBase, issue, startedTime, tempoGasto, comentario) {

    try {
      var response = HTTP.call('POST', Meteor.settings.jiraUrl + '/rest/api/2/issue/'+ issue + '/worklog', {
        data: { timeSpentSeconds: tempoGasto, started: startedTime, comment: comentario},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + userBase
        }
      });
      return response;

    } catch (err) {
      console.log(err);
      return err
    }
  },
  'checkIfUserExists': function (username) {
      return (Meteor.users.findOne({username: username})) ? true : false;
  }
});

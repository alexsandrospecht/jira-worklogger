import { Meteor } from 'meteor/meteor';
// import '../lib/collections/works.js';

Meteor.startup(() => {
  // Meteor.publish("allUsers", function () {
  //   return Meteor.users.find({});
  // });
});

Meteor.methods({
  logWork(userBase, issue, startedTime, tempoGasto, comentario) {
    HTTP.call('POST', Meteor.settings.jiraUrl + '/rest/api/2/issue/'+ issue + '/worklog', {
      data: { timeSpent: tempoGasto, started: startedTime, comment: comentario},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + userBase
      }
    }, (error, result) => {
        console.log(error);
        console.log(result);
    });
  }
});

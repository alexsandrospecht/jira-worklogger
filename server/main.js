import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  process.env.MAIL_URL = Meteor.settings.email;

  LDAP_DEFAULTS.url = Meteor.settings.ldapUrl;
  LDAP_DEFAULTS.dn = Meteor.settings.dn;
  LDAP_DEFAULTS.port = Meteor.settings.ldapPort;
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

      // if (err && err.statusCode) {
      //    throw new Meteor.Error(err.statusCode, 'There was an error processing your request' );
      // }
      return err
    }
  },
  'checkIfUserExists': function (username) {
    return (Meteor.users.findOne({username: username})) ? true : false;
  },
  'getDn': function () {
    return Meteor.settings.dn;
  },
  'getUserIssues': function (userBase) {
    var response = HTTP.call('GET', Meteor.settings.jiraUrl + '/rest/api/2/search?jql=filter="' + Meteor.settings.filter + '"', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + userBase
      }
    });
    return response;
  }
});

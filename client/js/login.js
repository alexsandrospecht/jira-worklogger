import { UserBase } from '../../lib/collections/userBase.js';
import { Base64 } from 'meteor/ostrio:base64';

UserIssues = {};

loadUserIssues = function() {

  setTimeout(function () {
    if (Meteor.user()) {
      Meteor.call('getUserIssues', UserBase.find({user: Meteor.user().username}).fetch()[0].base, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          for (var k in result['data']['issues']) {
            var issue = result['data']['issues'][k];
            UserIssues[issue['key'] + " - " + issue['fields']['summary']] = null;
          }

          $('input.autocomplete').autocomplete({
            data: UserIssues,
            limit: 10,
            minLength: 0,
          });
        }
      });
    }
  }, 1000);
}

Template.loginAccount.events({
    'submit form': function(event) {
        event.preventDefault();
        var loginVar = event.target.login.value;
        var passwordVar = event.target.password.value;

        Meteor.loginWithPassword(loginVar, passwordVar, function(error) {
            if (error) {
                Materialize.toast(error, 4000, 'rounded');
            } else {
                loadUserIssues();
                Router.go("worklogger");
            }
        });
    },
    'click #register': function(event) {
      event.preventDefault();
      Router.go("register");
    },
    'click #forgotPass': function(event) {
      event.preventDefault();
      Router.go("resetpass");
    }
});

Template.loginLDAP.events({
    'submit form': function(event) {
        event.preventDefault();
        var loginVar = event.target.login.value;
        var passwordVar = event.target.password.value;

        Meteor.call('getDn', function (err, result) {
          if (err) {
            alert('There is an error loading LDAP dn.');
          } else {
            Meteor.loginWithLDAP(loginVar, passwordVar, { dn: "uid="+ loginVar + result }, function (error, success) {
              if (error) {
                console.log(error);
                Materialize.toast(error, 4000, 'rounded');
              } else {
                if (!UserBase.findOne({user: loginVar , note:{"$exists":true}})) {
                  UserBase.insert({
                    base: Base64.encode(loginVar + ':' + passwordVar),
                    user: loginVar
                  });
                }
                loadUserIssues();
                Router.go("worklogger");
              };
            });
          }
        });
    }
});

Template.login.onRendered(function bodyOnCreated() {
  $('ul.tabs').tabs();
});

Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var loginVar = event.target.login.value;
    var passwordVar = event.target.password.value;
    var emailVar = event.target.email.value;

    Meteor.call('checkIfUserExists', loginVar, function (err, result) {
      if (err) {
        alert('There is an error while checking username');
      } else {
        if (result === false) {
          Accounts.createUser({
            email: emailVar,
            username: loginVar,
            password: passwordVar
          });
          UserBase.insert({
            base: Base64.encode(loginVar + ':' + passwordVar),
            user: loginVar,
            email: emailVar
          });
        } else {
          Materialize.toast('A user with this username already exists..', 4000, 'rounded');
        }
    }
  });
    Router.go("/");
  },
  'click #forgotPass' : function(event) {
    var email = $('#email')[0].value

    if (email === "") {
      Materialize.toast('Empty e-mail field!', 4000);
      return;
    }

    var options = {};
    options.email = email;
    Accounts.forgotPassword(options, function(error){
      if (error) {
        console.log(error);
      } else {
        alert('Check your mailbox!');
      }
    });
  },
});

Template.resetpass.events({
  'click #forgot' : function(event) {
    var email = $('#email')[0].value

    if (email === "") {
      Materialize.toast('Empty e-mail field!', 4000);
      return;
    }

    var options = {};
    options.email = email;
    Accounts.forgotPassword(options, function(error){
      if (error) {
        console.log(error);
      } else {
        $('.modal').modal({
            opacity: .5,
            inDuration: 300,
            complete: function() {
              Router.go("/");
            }
          }
        );
        $('#modal1').modal('open');
      }
    });
  },
});

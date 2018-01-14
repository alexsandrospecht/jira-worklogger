import { UserBase } from '../../lib/collections/userBase.js';
import { Base64 } from 'meteor/ostrio:base64';

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var loginVar = event.target.login.value;
        var passwordVar = event.target.password.value;

        Meteor.loginWithPassword(loginVar, passwordVar, function(error) {
            if (error) {
                Materialize.toast(error, 4000, 'rounded');
            } else {
                Router.go("worklogger");
            }
        });
    },
    'click #register': function(event) {
      event.preventDefault();
      Router.go("register");
    }
});

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var loginVar = event.target.login.value;
        var passwordVar = event.target.password.value;

        Meteor.call('checkIfUserExists', loginVar, function (err, result) {
           if (err) {
               alert('There is an error while checking username');
           } else {
               if (result === false) {
                 Accounts.createUser({
                     username: loginVar,
                     password: passwordVar
                 });
                 UserBase.insert({
                     base: Base64.encode(loginVar + ':' + passwordVar),
                     user: loginVar
                 });
               } else {
                   Materialize.toast('A user with this username already exists..', 4000, 'rounded');
               }
           }
       });

        Router.go("/");
    }
});

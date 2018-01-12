import { UserBase } from '../../lib/collections/userBase.js';
import { Base64 } from 'meteor/ostrio:base64';

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var loginVar = event.target.login.value;
        var passwordVar = event.target.password.value;

        if (Meteor.users.find({"username": loginVar}).count() == 0) {
          Accounts.createUser({
              email: loginVar,
              password: passwordVar
          });
          UserBase.insert({
              base: Base64.encode(loginVar + ':' + passwordVar),
              user: loginVar
          });
        }

        Meteor.loginWithPassword(loginVar, passwordVar, function(error) {
          console.log(loginVar + passwordVar);

            if (error) {
                console.log(error);
            } else {
                Router.go("worklogger");
            }
        });
    }
});

Template.login.rendered = function () {
  $(".container").fadeIn(1000);
  // $(".s2class").css({"color":"#EE9BA3"});
  // $(".s1class").css({"color":"#748194"});
  $("#left").removeClass("left_hover");
  $("#right").addClass("right_hover");
  // $(".signin").css({"display":"none"});
  // $(".signup").css({"display":""});
};

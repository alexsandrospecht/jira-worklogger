Meteor.subscribe('allUsers');

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
        }

        Meteor.loginWithPassword(loginVar, passwordVar, function(error){
            if (error) {
                console.log(error);
            } else {
                Router.go("worklogger");
            }
        });
    }
});

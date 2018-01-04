import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
  });
});

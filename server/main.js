import { Meteor } from 'meteor/meteor';
import '../lib/collections/works.js';


Meteor.startup(() => {
  Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
  });
});

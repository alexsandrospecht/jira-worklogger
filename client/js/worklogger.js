import { Session } from 'meteor/session'
import { Works } from '../../lib/collections/works.js';

Template.worklogger.helpers({
  works() {
    return Works.find({});
  },
});

Template.worklogger.events({
  'click #add'(event) {
    // works.insert({ order: works.find().count()});
  },
  'click #enviar'(event) {
    // works.remove({});
    // start();
  },
  'click #new_work'(event) {
    Works.insert({
     issue: '',
     startDate: new Date(),
     endDate: new Date(),
     user: Meteor.user().username
   });
 }
});

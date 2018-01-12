import { Session } from 'meteor/session'
import { Works } from '../../lib/collections/works.js';
import { UserBase } from '../../lib/collections/userBase.js';

Template.worklogger.helpers({
  works() {
    var user = Meteor.user();
    if (user) {
        return Works.find({user: Meteor.user().emails[0].address});
    }
  },
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('userBase');
  Meteor.subscribe('works');
});

Template.worklogger.events({
  'click #add'(event) {

  },
  'click #enviar'(event) {
    var userLogin = Meteor.user().emails[0].address;
    var userBase = UserBase.find({user: userLogin}).fetch()[0].base;

    Works.find({user: userLogin}).forEach(work => {
        Meteor.call('logWork', userBase, work.issue, '2013-09-01T10:30:18.932+0530', '1m', 'teste', (error, result) => {
          if (error) {
            console.log(error);
          } else {
            Works.remove(work._id);
          }
        });
    });
  },
  'click #new_work'(event) {
    Works.insert({
     issue: '',
     startDate: new Date(),
     endDate: new Date(),
     user: Meteor.user().emails[0].address
   });
 }
});

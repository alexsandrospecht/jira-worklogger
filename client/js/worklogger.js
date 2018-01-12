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
        var diff = Math.abs(work.startDate - work.endDate);
        var minutes = Math.floor( (diff/1000) / 60);

        if ( minutes > 0) {
          var start = String(moment(work.startDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));

          Meteor.call('logWork', userBase, work.issue, start, minutes+'m', 'teste', (error, result) => {
            if (error) {
              console.log(error);
            } else {
              Works.remove(work._id);
            }
          });
        }
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

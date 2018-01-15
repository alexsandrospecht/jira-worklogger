import { Works } from '../../lib/collections/works.js';
import { UserBase } from '../../lib/collections/userBase.js';

Template.worklogger.helpers({
  works() {
    var user = Meteor.user();
    if (user) {
        return Works.find({user: Meteor.user().username}, { sort: { startDate: 1 }});
    }
  },
});

Template.worklogger.events({
  'click #enviar'(event) {
    var userLogin = Meteor.user().username;
    var userBase = UserBase.find({user: userLogin}).fetch()[0].base;

    Works.find({user: userLogin}).forEach(work => {
        var diff = Math.abs(work.startDate - work.endDate);
        var minutes = Math.floor( (diff/1000) / 60);

        if ( minutes > 0 && work.startDate < work.endDate && work.issue) {
          var start = String(moment(work.startDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));

          Meteor.call('logWork', userBase, work.issue, start, minutes+'m', work.comment, (error, result) => {
            if (error) {
              Materialize.toast('Fail to send issue: '+ work.issue, 4000, 'rounded');
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
     user: Meteor.user().username,
     comment: '',
   });
 }
});
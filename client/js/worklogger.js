import { Session } from 'meteor/session'

Session.set( "works", [ "1", "2", "3"] );

Template.worklogger.helpers({
  works() {
    return Session.get('works')
  },
});

Template.worklogger.events({
  'click #add'(event) {
    // works.insert({ order: works.find().count()});
    var array = Session.get('works')
    array.push("4");
    Session.set( "works", array);

  },
  'click #enviar'(event) {
    // works.remove({});
    // start();
  },
});

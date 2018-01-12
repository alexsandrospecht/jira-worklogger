import { Mongo } from 'meteor/mongo';

export const Works = new Mongo.Collection('works');

if (Meteor.isServer) {
    Meteor.publish('works', function worksPublication() {
      return Works.find();
    });
}

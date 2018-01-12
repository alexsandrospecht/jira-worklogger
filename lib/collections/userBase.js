import { Mongo } from 'meteor/mongo';

export const UserBase = new Mongo.Collection('userBase');

if (Meteor.isServer) {
    Meteor.publish('userBase', function userBasePublication() {
      return UserBase.find();
    });
}

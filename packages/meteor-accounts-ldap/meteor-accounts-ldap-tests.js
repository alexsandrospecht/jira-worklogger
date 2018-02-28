// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-accounts-ldap.js.
import { name as packageName } from "meteor/meteor-accounts-ldap";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-accounts-ldap - example', function (test) {
  test.equal(packageName, "meteor-accounts-ldap");
});

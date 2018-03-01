import { Works } from '../../lib/collections/works.js';
import { UserBase } from '../../lib/collections/userBase.js';

Template.work.events({
  'change #issue'(event) {
    event.preventDefault();
    if (event.target.value.indexOf(" - ") !== -1 ) {
      event.target.value = event.target.value.split(" - ")[0];
    }

    Works.update(this._id, {
      $set: { issue: event.target.value },
    });
  },
  'change #comment'(event) {
    event.preventDefault();
    Works.update(this._id, {
      $set: { comment: event.target.value },
    });
  },
  'change #inicio-date'(event) {
    event.preventDefault();

    Works.update(this._id, {
      $set: { startDate: getNewDateWithCurrentTime(event.target.value, this.startDate.getHours(), this.startDate.getMinutes(), this.startDate.getSeconds()),
              endDate: getNewDateWithCurrentTime(event.target.value, this.endDate.getHours(), this.endDate.getMinutes(), this.endDate.getSeconds())},
    });
  },
  'blur #inicio-time'(event) {
    event.preventDefault();

    var valor = event.target.value;
    if (valor.indexOf(":") != -1) {
      var array = event.target.value.split(":");
      var hora = array[0];
      var minuto = array[1];

      var oldDate = moment(this.startDate);
      if (!(oldDate.hour() === hora && oldDate.minutes() === minuto)) {
        oldDate.set({hour:hora, minute:minuto});

        Works.update(this._id, {
          $set: { startDate: oldDate.toDate() },
        });
      }
    }
  },
  'blur #fim-time'(event) {
    event.preventDefault();

    var valor = event.target.value;
    if (valor.indexOf(":") != -1) {
      var array = event.target.value.split(":");
      var hora = array[0];
      var minuto = array[1];

      var oldDate = moment(this.endDate);
      if (!(oldDate.hour() === hora && oldDate.minutes() === minuto)) {
        oldDate.set({hour:hora, minute:minuto});

        Works.update(this._id, {
          $set: { endDate: oldDate.toDate() },
        });
      }
    }
  },
  'click #remove'(event) {
    event.preventDefault();
    Works.remove(this._id);
  },
  'focus .time'(event) {
    event.preventDefault();
    event.target.select();
  }
});

function getNewDateWithCurrentTime(value, hr, min, sec) {
  var newDate = moment(value, "DD/MM/YYYY");
  newDate.set({hour:hr, minute:min, second: sec});

  return newDate.toDate();
}

Template.work.onRendered(function() {
  $(".time").inputmask("hh:mm");

  $(".datepicker").pickadate({
    selectMonths: true,
    selectYears: true,
    clear: false,
    format: 'dd/mm/yyyy',
    closeOnSelect: true
  });

  console.log(UserIssues);

  $('input.autocomplete').autocomplete({
    data: UserIssues,
    limit: 10,
    minLength: 0,
  });

  // Meteor.call('getUserIssues', UserBase.find({user: Meteor.user().username}).fetch()[0].base, (error, result) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     var output = {};
  //
  //     for (var k in result['data']['issues']) {
  //       var issue = result['data']['issues'][k];
  //       output[issue['key'] + " - " + issue['fields']['summary']] = null;
  //     }
  //
  //     $('input.autocomplete').autocomplete({
  //       data: output,
  //       limit: 10,
  //       minLength: 0,
  //     });
  //   }
  // });
});

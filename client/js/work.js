import { Works } from '../../lib/collections/works.js';

Template.work.events({
  'change #issue'(event) {
    event.preventDefault();
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
    var newDate = moment(event.target.value, "DD/MM/YYYY");
    newDate.set({hour:this.startDate.getHours(), minute:this.startDate.getMinutes()});

    Works.update(this._id, {
      $set: { startDate: newDate.toDate() },
    });
  },
  'change #fim-date'(event) {
    event.preventDefault();
    var newDate = moment(event.target.value, "DD/MM/YYYY");
    newDate.set({hour:this.endDate.getHours(), minute:this.endDate.getMinutes()});

    Works.update(this._id, {
      $set: { endDate: newDate.toDate() },
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
      if (!(oldDate.hour() == hora && oldDate.minutes() == minuto)) {
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
      if (!(oldDate.hour() == hora && oldDate.minutes() == minuto)) {
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

Template.work.onRendered(function bodyOnCreated() {
  $(".time").inputmask("hh:mm");

  $(".datepicker").pickadate({
    selectMonths: true,
    selectYears: true,
    clear: false,
    format: 'dd/mm/yyyy',
    closeOnSelect: true
  });

});

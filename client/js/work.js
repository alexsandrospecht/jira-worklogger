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
});

Template.work.onRendered(function bodyOnCreated() {
  var diaSemana = [ 'Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado' ];
  var mesAno = [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'           , 'Dezembro' ];
  var data = new Date();
  $(".datepicker").pickadate({
    monthsFull: mesAno,
    monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    weekdaysFull: diaSemana,
    weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
    weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
    selectMonths: true,
    selectYears: true,
    clear: false,
    format: 'dd/mm/yyyy',
    today: "Hoje",
    close: "Fechar",
    min: new Date(data.getFullYear() - 1, 0, 1),
    max: new Date(data.getFullYear() + 1, 11, 31),
    closeOnSelect: true
  });
  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Limpar', // text for clear-button
    canceltext: 'Fechar', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
  });
  $('.tooltipped').tooltip({delay: 0});
});

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
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });
});

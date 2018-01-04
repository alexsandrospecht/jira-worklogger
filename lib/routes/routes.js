Router.configure({
  layoutTemplate: 'main_layout'
});

Router.map(function(){
  this.route('worklogger', {
    path: '/worklogger',
    template: 'worklogger'
  });

  this.route('login', {
    path: '/',
    template: 'login'
  });
});

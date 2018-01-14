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

  this.route('register', {
    path: '/register',
    template: 'register'
  });
});

Router.onBeforeAction(function() {
  if ((!Meteor.userId()) && this.request.url != "/register") {
    this.render('login');
  } else {
    this.next();
  }
});

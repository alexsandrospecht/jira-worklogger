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

  this.route('resetpass', {
    path: '/resetpassword',
    template: 'resetpass'
  });
});

Router.onBeforeAction(function() {
  if ((!Meteor.userId()) && this.request.url != "/register" && this.request.url != "/resetpassword") {
    this.render('login');
  } else {
    this.next();
  }
});

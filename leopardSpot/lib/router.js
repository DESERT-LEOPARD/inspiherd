Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function(){
  //   return Meteor.subscribe('slides');
  // }
});

Router.route('/',{
  name: 'intro'
});

Router.route('/signup', {
  name: 'signup'
});

Router.route('/login',{
  name: 'login'
});

Router.route('/create',{
  name: 'makePresentation'
});


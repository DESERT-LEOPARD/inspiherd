Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function(){
  //   return Meteor.subscribe('slides');
  // }
});
<<<<<<< HEAD

Router.route('/',{
  name: 'intro'
});

Router.route('/signup', {
  name: 'signup'
});

Router.route('/login',{
  name: 'login'
});

Router.route('/presentationView',{
  name: 'presentationView'
});
=======
>>>>>>> 16846eda1da1b597b719d54fe9c1e80e355f8c2a

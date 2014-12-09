Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
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

Router.route('/list',{
  name: 'savedPresentations'
});

Router.route('slides/:_sd_id/:_page?', function(){
  this.layout('slideLayout');

  var _page = parseInt(this.params._page ? this.params._page : 1);
  Session.set('_sd_id', this.params._sd_id);
  Session.set('_page', _page);
  Session.set('isSession', false);
  this.render('slides');
});

Router.route('sessions/:_ps_id', function(){
  this.layout('slideLayout');

  Session.set('_ps_id', this.params._ps_id);
  Session.set('isSession', true);
  this.render('slides');
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'makePresentation'});
if ( Meteor.isClient ) {
  Meteor.subscribe('slideDecks');
}

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

Router.route('/list',{
  name: 'savedPresentations'
});

Router.route('slides/:_sd_id/:_page?', function(){
  this.layout('slideLayout');

  var params = this.params;
  var _page = parseInt(params._page ? params._page : 1);
  Session.set("_sd_id", params._sd_id);
  Session.set("_page", _page);
  this.render('slides',{data: {_sd_id:params._sd_id}});
});

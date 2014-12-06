Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('polling');}

});

Router.route('/', {name: 'hello'});
Router.route('/polling', {
	name: 'polling'
});
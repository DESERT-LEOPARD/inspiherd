Router.configure({
	layoutTemplate: 'hello',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('posts'); }
});

//Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'polling',
	data: function() { return Posts.findOne(this.params._id); }
});

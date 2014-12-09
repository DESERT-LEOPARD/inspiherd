if (Meteor.isClient) {

  Template.polling.helpers({
    return: function () {
      return Session.get("return");
    },
  });

  Template.polling.events({
    'click #return': function () {
      Router.go('/sessions/:_ps_id')
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

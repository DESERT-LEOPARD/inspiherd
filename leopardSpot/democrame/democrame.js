if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("voteA", 0);
  Session.setDefault("voteB", 0);
  Session.setDefault("voteC", 0);
  Session.setDefault("voteD", 0);

  Template.polling.helpers({
    voteA: function () {
      return Session.get("voteA");
    },
    voteB: function () {
      return Session.get("voteB");
    },
    voteC: function () {
      return Session.get("voteC");
    },
    voteD: function () {
      return Session.get("voteD");
    }
  });

  Template.hello.events({
    'click #voteA': function () {
      // increment the counter when button is clicked
      Session.set("voteA", Session.get("voteA") + 1);
      Router.go('/results');

      // $('#choiceA').progress('increment');
    },
    'click #voteB': function () {
      // increment the counter when button is clicked
      Session.set("voteB", Session.get("voteB") + 1);
      Router.go('/results');
    },
    'click #voteC': function () {
      // increment the counter when button is clicked
      Session.set("voteC", Session.get("voteC") + 1);
      Router.go('/results');
    },
    'click #voteD': function () {
      // increment the counter when button is clicked
      Session.set("voteD", Session.get("voteD") + 1);
      Router.go('/results');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

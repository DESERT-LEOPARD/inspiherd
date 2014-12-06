PresentSessions = new Mongo.Collection('presentSessions');

PresentSessions.allow({

});

PresentSessions.deny({

});

Meteor.methods({
  'createPresentSessions': function(presentSession) {
    check(Meteor.userId(), String);
    check(presentSession, {
      slideDeck_id: String,
      presenter_id: String
    });

    presentSession.page = 1;
    presentSession.polls = [];

    PresentSessions.insert(presentSession);
  }
});
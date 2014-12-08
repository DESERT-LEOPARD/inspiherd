PresentSessions = new Mongo.Collection('presentSessions');

PresentSessions.allow({
  update:function (userId, doc, fields, modifier) {
    // [TODO]
    // return doc.presenter_id === userId;
    return true;
  }

});

PresentSessions.deny({

});

Meteor.methods({
  'createPresentSessions': function(presentSession) {
    // check(Meteor.userId(), String);
    check(presentSession, {
      slideDeck_id: String,
      presenter_id: String
    });

    presentSession.page = 1;
    presentSession.polls = [];

    var id = PresentSessions.insert(presentSession);
    return id;
  }
});
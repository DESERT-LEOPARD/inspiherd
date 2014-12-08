PresentSessions = new Mongo.Collection('presentSessions');

if ( Meteor.isServer ) {
  Meteor.publish('presentSessions', function(query){
    if ( query ) {
      return PresentSessions.find(query);
    } else {
      return [];
    }
  });

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
}

if ( Meteor.isClient ) {
  Tracker.autorun(function(){
    Meteor.subscribe('presentSessions',{_id:Session.get('_ps_id')});
  });
}
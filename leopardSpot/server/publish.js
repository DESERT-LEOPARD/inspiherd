//Publishing all slides, for now
Meteor.publish('slideDecks', function(){
  return SlideDecks.find();
});

Meteor.publish('presentSessions', function(){
  return PresentSessions.find();
});


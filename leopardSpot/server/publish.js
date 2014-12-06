//Publishing all slides, for now
Meteor.publish('slideDecks', function(){
  return SlideDecks.find();
});

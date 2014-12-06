//Publishing all slides, for now
Meteor.publish('slideDecks', function(id){
  return SlideDecks.find({_id:id});
});

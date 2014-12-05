//Publishing all slides, for now
Meteor.publish('slides', function(){
  return Slides.find();
});

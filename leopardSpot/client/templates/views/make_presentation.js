Template.makePresentation.events({
  'submit': function(event, template) {
    var mdRaw = $(event.target).find('#mdRawTextArea').val();
    Meteor.call('createSlideDeck', {'mdRaw':mdRaw});
    event.preventDefault();
  }
});
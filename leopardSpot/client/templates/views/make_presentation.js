Template.makePresentation.events({
  'submit': function(event, template) {
    var mdRaw = $(event.target).find('#mdRawTextArea').val();
    event.preventDefault();
    
    Meteor.call('createSlideDeck', {'mdRaw':mdRaw}, function(err, id) {
      Router.go('/slides/'+id);
    });
    

  }
});
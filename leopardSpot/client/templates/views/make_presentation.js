Template.makePresentation.events({
  'submit': function(event, template) { // event listener for the submit event on the makePresentation form
    var mdRaw = $(event.target).find('#mdRawTextArea').val();
    event.preventDefault(); // if there is no action in the form that this corresponds to, the default action is to refresh the page. This prevents that. Meteor routing is mostly on client side. If you didn't have that, it would never hit the following function.
    
    Meteor.call('createSlideDeck', {'mdRaw':mdRaw}, function(err, id) {
      Router.go('/slides/'+id); //Meteor.call, calls functionality from lib/collections/SlideDecks.js. On completion of 'createSlideDeck, it returns it'
    });
    

  }
});
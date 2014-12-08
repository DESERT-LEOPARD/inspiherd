
Template.savedPresentations.helpers({
  decks : function () {
    return SlideDecks.find();
  }
});

Template.savedPresentations.events({
  'click #startPresentation': function(event, template) { 
    event.preventDefault(); // if there is no action in the form that this corresponds to, the default action is to refresh the page. This prevents that. Meteor routing is mostly on client side. If you didn't have that, it would never hit the following function.
      Meteor.call('createPresentSessions', {slideDeck_id:this._id, presenter_id:''}, function(err, ps_id) {
        Router.go('/sessions/'+ps_id);
      });
  },
  'click #reviewPresentation': function(event, template) { // event listener for the submit event on the makePresentation form
    event.preventDefault(); 
    var sd_id = this._id;
    Router.go('/slides/' + sd_id); 
    }
});

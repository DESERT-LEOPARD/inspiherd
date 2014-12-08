
Template.savedPresentations.helpers({
  decks : function () {
    return SlideDecks.find();}
});

Template.savedPresentations.events({
  'click #startPresentation': function(event, template) { // event listener for the submit event on the makePresentation form
    event.preventDefault(); // if there is no action in the form that this corresponds to, the default action is to refresh the page. This prevents that. Meteor routing is mostly on client side. If you didn't have that, it would never hit the following function.
    console.log(SlideDecks.find({title: this.title}))
      Meteor.call('createPresentSessions', {slideDeck_id:sd_id, presenter_id:''}, function(err, ps_id) {
        console.log('result',ps_id);
        Router.go('/sessions/'+ps_id);
      });
  }
  // 'submit2': function(event, template) { // event listener for the submit event on the makePresentation form
  //   event.preventDefault(); // if there is no action in the form that this corresponds to, the default action is to refresh the page. This prevents that. Meteor routing is mostly on client side. If you didn't have that, it would never hit the following function.
  //   Router.go('/slides/'+_sd_id+'/' _page);
  //   };
});

Template.makePresentation.events({
  'submit': function(event, template) {
    var mdRaw = $(event.target).find('#mdRawTextArea').val();
    event.preventDefault();
    
    Meteor.call('createSlideDeck', {'mdRaw':mdRaw}, function(err, sd_id) {

      Meteor.call('createPresentSessions', {slideDeck_id:sd_id, presenter_id:''}, function(err, ps_id) {
        console.log('result',ps_id);
        // Present Session id
        Router.go('/sessions/'+ps_id);
      });
    });
    

  }
});
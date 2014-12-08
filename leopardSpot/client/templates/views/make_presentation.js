// Template.makePresentation.events({
//   'submit': function(event, template) { // event listener for the submit event on the makePresentation form
//     var mdRaw = $(event.target).find('#mdRawTextArea').val();
//     event.preventDefault(); // if there is no action in the form that this corresponds to, the default action is to refresh the page. This prevents that. Meteor routing is mostly on client side. If you didn't have that, it would never hit the following function.
    
//     Meteor.call('createSlideDeck', {'mdRaw':mdRaw}, function(err, sd_id) {

//       Meteor.call('createPresentSessions', {slideDeck_id:sd_id, presenter_id:''}, function(err, ps_id) {
//         console.log('result',ps_id);
//         // Present Session id
//         Router.go('/sessions/'+ps_id);
//       });
//     });
    
//   }
// });

Template.makePresentation.events({
  'submit': function(event, template) { // event listener for the submit event on the makePresentation form
    var mdRaw = $(event.target).find('#mdRawTextArea').val();
    var title = $(event.target).find('#presentationTitle').val()
    event.preventDefault(); // if there is no action in the form that this corresponds to, the default action is to refresh the page.
    // This prevents that. Meteor routing is mostly on client side. If you didn't have that, it would never hit the following function.
    Meteor.call('createSlideDeck', {'mdRaw':mdRaw, 'title':title}, function(err) {
        Router.go('/list');
    }); 
  } 
});

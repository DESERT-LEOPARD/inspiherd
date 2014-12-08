SlideDecks = new Mongo.Collection('slideDecks');
// this is executed on both client and server side. Has two functionalities. On server-
//side it will populate a mongo-DB database. On client side, it will create a 
// mini-mongo and sync it with the server side

if ( Meteor.isServer ) {
  Meteor.publish('slideDecks', function( query ){
    if ( query ) {
      return SlideDecks.find(query);
    } else {
      return [];
    }
  });

  SlideDecks.allow({ // sends permission to allow client side to make these alterations to the collection
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return doc.owner === userId;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return doc.owner === userId;
    },
    fetch: ['owner']
  });

  SlideDecks.deny({ // denies permission to client to perform these actions
    update: function (userId, docs, fields, modifier) {
      // can't change owners
      return _.contains(fields, 'owner');
    },
    remove: function (userId, doc) {
      // can't remove locked documents
      return doc.locked;
    },
    fetch: ['locked'] // no need to fetch 'owner'
  });

  Meteor.methods({
    'createSlideDeck': function(slideDeck) {
      check(slideDeck, {
        // [TODO]
        title: String,
        mdRaw: String
      });

      slideDeck.mdSlides = slideDeck.mdRaw.split('* * *'); // mdRaw is the text contained within the textarea. This splits it
      slideDeck.owner = Meteor.userId();

      // Slide Deck id
      var sd_id = SlideDecks.insert(slideDeck);
      return sd_id;


    }
  });
}

if ( Meteor.isClient ) {
  Tracker.autorun(function(){
    if ( Meteor.userId() ) {
      Meteor.subscribe('slideDecks',{owner:Meteor.userId()});
    }
  });
}
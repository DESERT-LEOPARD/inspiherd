Meteor.subscribe('slideDecks', Session.get('_sd_id'));

(function(){
  console.log('#id#', Session.get('_sd_id'));
  console.log('#', SlideDecks.find() );
  console.log('#', SlideDecks.findOne({_id:Session.get('_sd_id')} ) );
  Session.setDefault("index", 1);
  Session.setDefault("slideLength", 3);
  Session.setDefault("opacity", 0);

  var validateIndex = function(ind) {
    if ( ind < 1 ) {
      return false;
    } else if ( ind > Session.get('slideLength') ) {
      return false;
    }
    return true;
  }

  Template.slides.helpers({
    index: function () {
      return Session.get("index");
    },
    mk: function(n) {
      var slides = [''];
      slides.push("#LeopardSpot\n__such slides__\n##*so amazing*\n* very fancy\n\n![doge](http://www.fimfiction-static.net/images/avatars/134636_256.jpg)");
      slides.push("#Words\nyeap, hella cool.\n");
      slides.push("#I mean\n##friendship is magic\n###boom\n![magic](http://img1.wikia.nocookie.net/__cb20120311061118/mlpfanart/images/1/10/Fluffy_pony.png)");
      slides.push("#MUNI\n##TRUE\n![muni](https://i.imgflip.com/csv1f.jpg)");

      Session.set("slideLength", slides.length-1);
      return slides[n];
    },
    opacity: function () {
      return Session.get("opacity");
    },
    slideLength: function(){
      return Session.get('slideLength');
    }
    
  });

  Template.slides.rendered = function() {
    Session.set("opacity",100);
  }

  var goPage = function(ind) {
    if ( !validateIndex(ind) ) return ;

    Session.set("opacity",0);
    
    Meteor.setTimeout(function(){
      Router.go('/slides/'+ind);
      Session.set("opacity",100)
    },200);
  }


  var next = function() {
    goPage(Session.get("index") + 1);
  }

  var prev = function() {
    goPage(Session.get("index") - 1);
  }

  Template.slides.events({
    'click #next': function () {
      next();
    },
    'click #prev': function () {
      prev();

    }
  });

  UI.body.events({
    'keydown': function(e){
      if ( e.which === 39 ) {
        next();
      } else if ( e.which === 37 ) {
        prev();
      }
    }
  });
})();
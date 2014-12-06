(function(){
  
  Session.setDefault("_page", 1);
  Session.setDefault("slideLength", 3);
  Session.setDefault("opacity", 0);

  var validatePageNum = function(pg) {
    if ( pg < 1 ) {
      return false;
    } else if ( pg > Session.get('slideLength') ) {
      return false;
    }
    return true;
  }

  Template.slides.created = function() {
    Template.slides._mdSlides = SlideDecks.findOne({_id:Session.get('_sd_id')}).mdSlides;
    console.log('$$', Template.slides._mdSlides);
    Session.set("slideLength", Template.slides._mdSlides.length);
    Template.slides._mdSlides.unshift('');
  }

  Template.slides.helpers({
    _page: function () {
      return Session.get("_page");
    },
    mk: function(n) {
      var slides = [''];
      slides.push("#Words\nyeap, hella cool.\n");
      slides.push("#I mean\n##friendship is magic\n###boom\n![magic](http://img1.wikia.nocookie.net/__cb20120311061118/mlpfanart/images/1/10/Fluffy_pony.png)");
      slides.push("#MUNI\n##TRUE\n![muni](https://i.imgflip.com/csv1f.jpg)");
      
      return Template.slides._mdSlides[n];
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

  var goPage = function(pg) {
    if ( !validatePageNum(pg) ) return ;

    Session.set("opacity",0);
    
    Meteor.setTimeout(function(){
      Router.go('/slides/'+Session.get("_sd_id")+"/"+pg);
      Session.set("opacity",100)
    },200);
  }


  var next = function() {
    goPage(Session.get("_page") + 1);
  }

  var prev = function() {
    goPage(Session.get("_page") - 1);
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
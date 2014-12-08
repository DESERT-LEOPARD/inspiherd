(function(){
  
  var _mdSlides;

  var fetchDep = window.fett = new Tracker.Dependency;
  var handle = Tracker.autorun(function () {
    var foundSessionOrNonSession = true;
    if ( Session.get('isSession') ) {
      foundSessionOrNonSession = PresentSessions.findOne({_id:Session.get('_ps_id')})
      if ( foundSessionOrNonSession ) {
        Session.set('_sd_id', foundSessionOrNonSession.slideDeck_id);
        Session.set('_page', foundSessionOrNonSession.page);
      }
    }

    if ( foundSessionOrNonSession ) {
      var foundSlideDeck = SlideDecks.findOne({_id:Session.get('_sd_id')});
      if ( foundSlideDeck ) {
        _mdSlides = foundSlideDeck.mdSlides;
        Session.set('_slideLength', _mdSlides.length);
        _mdSlides.unshift('');
        fetchDep.changed();
        // handle.stop();
      }
    }

  });

  var pageDep = new Tracker.Dependency;

  Session.setDefault("stopwatch", 0);

  var validatePageNum = function(pg) {
    if ( pg < 1 ) {
      return false;
    } else if ( pg > Session.get('_slideLength') ) {
      return false;
    }
    return true;
  }


  Template.slides.created = function() { // invoked every time before a template is rendered, and fetches data from the Mongo server.
    Template.slides._mdSlides = SlideDecks.findOne({_id:Session.get('_sd_id')}).mdSlides;
    console.log('$$', Template.slides._mdSlides);
    Session.set("slideLength", Template.slides._mdSlides.length);
    Template.slides._mdSlides.unshift('');
  }

  Template.slides.helpers({
    _page: function() {
      return Session.get("_page");
    },
    _slideLength: function() {
      return Session.get('_slideLength');
    },
    markDownSource: function(n) {
      fetchDep.depend();
      if (_mdSlides) {
        return _mdSlides[n];
      }
    },
    opacity: function () {
      return Session.get("opacity");

    },
    slideLength: function(){
      return Session.get('slideLength');
    },
    stopwatch: function(time) {
      var hours, minutes, seconds;
      // console.log('stopwatch called');
      var stopwatch = Session.get('stopwatch');
      Meteor.setInterval(function(){
        stopwatch++;
        Session.set('stopwatch', stopwatch);
      },1000);
      if(stopwatch >= 60){                // sets minutes
        if(stopwatch >= 3600) {
          // console.log('hours');
          hours = Math.floor(stopwatch / 3600);
          minutes = Math.floor((stopwatch - (hours * 60) * 60) / 60);
        }
        // console.log('minutes');
        minutes = minutes || Math.floor(stopwatch / 60);
        seconds = stopwatch - (minutes * 60);
      }
      else {
        // console.log('seconds');
        seconds = stopwatch;
      }
      console.log(hours, minutes, seconds);
      return (hours === undefined ? '00:' : (hours < 10? '0' + hours + ":" : hours + ":")) +
             (minutes === undefined ? '00:' : (minutes < 10 ? '0' + minutes + ":" : minutes + ":")) +
             (seconds < 10 ? '0' + seconds : seconds);
    }
    
  });

  var goPage = function(pg) {
    if ( !validatePageNum(pg) ) return ;

    if (Session.get('isSession')) {
      _goPage_session(pg);
    } else{
      _goPage_nonSession(pg);
    }

  }

  var _goPage_session = function(pg) {
    Session.set("opacity",0);
    
    Meteor.setTimeout(function(){
      PresentSessions.update({_id:Session.get('_ps_id')}, {$set: {'page': pg}});
      Session.set('_page',pg);
      Session.set("opacity",100);
    },200);
  }

  var _goPage_nonSession = function(pg) {
    Session.set("opacity",0);
    
    Meteor.setTimeout(function(){
      Router.go('/slides/'+Session.get("_sd_id")+"/"+pg);
      Session.set("opacity",100);
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
      if ( e.which === 39 ) { // right arrow key
        next();
      } else if ( e.which === 37 ) { // left arrow key
        prev();
      }
    }
  });

})();

(function(){
  
  Session.setDefault("_page", 1);
  Session.setDefault("slideLength", 3);
  Session.setDefault("opacity", 0);
  Session.setDefault("stopwatch", 3595);

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
             (minutes === undefined ? '00:' : (minutes < 10 ? '0' + minutes : minutes)) +
             (seconds < 10 ? ':0' + seconds : ":" + seconds);
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
      Session.set("opacity",100);
    },200);
  }


  var next = function() {
    goPage(Session.get("_page") + 1);
  }

  var prev = function() {
    goPage(Session.get("_page") - 1);
  }

  // var stopW = function(){
  //   var seconds = 0,
  //       minutes = 0,
  //       hours = 0;
  //   var add = function() {
  //       seconds++;
  //       if (seconds >= 60) {
  //           seconds = 0;
  //           minutes++;
  //           if (minutes >= 60) {
  //               minutes = 0;
  //               hours++;
  //           }
  //       }
  //       // time.textContent = (hours ? (hours > 9 ? hours : "0" + hours)
  //       //                     : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes)
  //       //                     : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  //           document.getElementById("stopwatch").textContext = '01:00:00';

  //       timer();
  //   };

  //   function timer() {
  //       t = setTimeout(add, 1000);
  //   }
  //   timer();
  // }
  // stopW();
  // document.getElementById("stopwatch").textContext = '01:00:00';


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

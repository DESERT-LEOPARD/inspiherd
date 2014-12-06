if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("thumbUp", 0);
  Session.setDefault("thumbMiddle", 0);
  Session.setDefault("thumbDown", 0);
  var thumbsTotal = 0;
  var votesTotal = 0;
  var averageTotal;

  Template.thumb.helpers({
    thumbUp: function () {
      return Session.get("thumbUp");
    },
    thumbMiddle: function () {
      return Session.get("thumbMiddle");
    },
    thumbDown: function () {
      return Session.get("thumbDown");
    }
  });

  function rotateThumb() {
  var c=document.getElementById("rotatingThumb");
  var ctx=c.getContext("2d");
  ctx.rotate(20*Math.PI/180);
  };

  Template.thumb.events({
    'click #thumbUp': function () {
      Session.set("thumbUp", Session.get("thumbUp") + 1);
      Session.set("rotatingThumb", rotateThumb());
      thumbsTotal += 1;
      votesTotal++;
      averageTotal = thumbsTotal/votesTotal;
      console.log(thumbsTotal);
      console.log(votesTotal);
      console.log(averageTotal);
    },
    'click #thumbMiddle': function () {
      // increment the counter when button is clicked
      Session.set("thumbMiddle", Session.get("thumbMiddle") + .5);
      thumbsTotal += 0.5;
      votesTotal++;
      averageTotal = thumbsTotal/votesTotal;
    },
    'click #thumbDown': function () {
      // increment the counter when button is clicked
      Session.set("thumbDown", Session.get("thumbDown") + 0);
      votesTotal++;
      averageTotal = thumbsTotal/votesTotal;
    } 
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}





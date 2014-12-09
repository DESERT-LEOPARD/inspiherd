if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("thumbUp", 0);
  Session.setDefault("thumbMiddle", 0);
  Session.setDefault("thumbDown", 0);

  Template.thumbresults.helpers({
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

  //work in progress thumb rotation script
  function rotateThumb() {
  var c=document.getElementById("rotatingThumb");
  var ctx=c.getContext("2d");
  ctx.rotate(20*Math.PI/180);
  };

  Template.thumb.events({
    'click #thumbUp': function () {
      // increment the counter when button is clicked
      Session.set("thumbUp", Session.get("thumbUp") + 1);
      Router.go('/thumbResults');
    },
    'click #thumbMiddle': function () {
      // increment the counter when button is clicked
      Session.set("thumbMiddle", Session.get("thumbMiddle") + 1);
      Router.go('/thumbResults');
    },
    'click #thumbDown': function () {
      // increment the counter when button is clicked
      Session.set("thumbDown", Session.get("thumbDown") + 1);
      Router.go('/thumbResults');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

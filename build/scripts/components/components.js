// In this folder you should add files that do one thing for example.

// animate.js this file has your javascript animations
// header.js this file has javascript for just your header element
// footer.js same as above but for your footer
// video.js this has JS just for your videos
// forms.js this has javascript just for your forms
// Follow the format below for settup on All JS pages


// set up the object app unless already created
// all javascript will be tied to this app object.
var app = app || {};
(function($){
  app.components = {
  	logWhatsInHere : function () {
  		// alert('What it do');
  	}, // this commma is very important . dont forget, leads to broken code.

  	alertWhatsInHere : function () {
  		// alert('What it do');
  	},

  	showVideos : function () {
  		// How you call a cached element
  		// If there was a class called show
  		app.components.els.video.addClass('show');
  	},

  	// you'll have a function always that will call all your other functions to fire off. This function INIT is it.
    init : function() {
    // set up your variables if necessary. Don't go hardcore over it, for example if your element gets created AFTER this function fires, it wont be cached.
      app.components.els = {
    	   // caching elements makes it so javascript doesnt have to look up the element every single time. heres an example:
    	   calendar : $('#calendar'), // app.components.els.calendar
    	   video : $('.video') // app.components.els.video
      };
      // How to call the other functions:
      // these fire in order like all javascript functions
      app.components.logWhatsInHere();
      app.components.alertWhatsInHere();
      app.components.showVideos();
    }
  };
  // when the document is ready / page is loaded. Call the init function that has all the other functions in it.
  jQuery(document).ready(function() {
    app.components.init(); // firing this page off when the doc is ready.
    // See how everything is app.components?
  });
}(jQuery));

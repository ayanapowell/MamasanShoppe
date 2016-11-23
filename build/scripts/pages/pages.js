// this folder is for page specific javascript. These functions should ONLY fire on that page
// for example, maybe you only have an image carousel on the homepage, that function could be called here. 

// home.js only home page
// about.js only about page

// How to fire functions specific to a page? add a body class or find a body class and create an if statement
// In this folder you should add files that do one thing for example.


var app = app || {};
(function($){
  app.home = {
  	homeSpecificFunction : function () {
  		console.log("I'm the homepage");
  	}, // this commma is very important . dont forget, leads to broken code. 
  	
  	callFunctionFromComponentsFile : function () {
  		// How you call a function that lives in another file.
  		app.components.alertWhatsInHere();
  	},

  	// you'll have a function always that will call all your other functions to fire off. This function INIT is it.
    init : function() {
    // set up your variables if necessary. Don't go hardcore over it, for example if your element gets created AFTER this function fires, it wont be cached.
      app.home.els = {
    	   // caching elements makes it so javascript doesnt have to look up the element every single time. heres an example:
    	   heroImage : $('#hero'), // app.home.els.heroImage
      };
      // How to call the other functions:
      // these fire in order like all javascript functions
      app.home.homeSpecificFunction();
      app.home.callFunctionFromComponentsFile();
    }
  };
  // when the document is ready / page is loaded. Call the init function that has all the other functions in it.
  jQuery(document).ready(function() {
  	// here you'll check what page youre on
  	// only fire if the body class on this page has the HOME class. Assuming our homepage has this class on the body.
  	if ( $('body').hasClass('home') ) {
	    app.home.init(); // firing this page off when the doc is ready.
  	}
  });
}(jQuery));


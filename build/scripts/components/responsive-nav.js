var app = app || {};
(function($){
  app.responsiveNav = {
    checkWindowWidth: function () { // When page loads, do this first.
      if(window.innerWidth < 768) { // if mobile, show menu icon and hide navigation items
        app.responsiveNav.els.menuIcon.removeClass('hidden');
        app.responsiveNav.els.navItems.addClass('hidden');
      } else if (window.innerWidth > 768) { // if desktop hide menu icon and show navigation
        app.responsiveNav.els.navItems.removeClass('hidden');
        app.responsiveNav.els.menuIcon.addClass('hidden');
      }
    },

    watchForWindowChanges: function () {
      $(window).resize(function(){ // watch for changes and checking window-width conditionals
      	app.responsiveNav.checkWindowWidth();
      });
    },

  	responsiveNavigation : function () {
      $('#menu').click(function(){  // when menu icon is clicked, slide in nav and dim everything else.
        app.responsiveNav.els.menuIcon.addClass('hidden'); // hide menu icon
        setTimeout(function() {
          $('.overlays').css({
            'opacity': '0.8'
          });
        }, 80);
        $('#close-button').show();
        $('#responsive-nav').removeClass('hidden-nav'); // show the sliding nav
      });

      $('#close-button').click(function() {
        $(this).hide(); // hide close-button icon
        setTimeout(function() {
          app.responsiveNav.els.menuIcon.removeClass('hidden'); // show menu icon
        }, 400);
        $('.overlays').css({
          'opacity': '0'
        });
        $('#menu').show();
        $('#responsive-nav').addClass('hidden-nav'); // hide sliding nav
      });
  	},
    init : function() {
      app.responsiveNav.els = {
    	  navItems : $('#nav .nav-item'),
        responsiveNav : $('#responsive-nav'),
        menuIcon : $('#menu'),
      };
      // console.log('init');
      app.responsiveNav.checkWindowWidth();
      app.responsiveNav.watchForWindowChanges();
      app.responsiveNav.responsiveNavigation();
    }
  };
  jQuery(document).ready(function() {
    app.responsiveNav.init();
  });
}(jQuery));

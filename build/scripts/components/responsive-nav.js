var app = app || {};
(function($){
  app.responsiveNav = {
  	responsiveNaviation : function () {
      var that = this;

      this.els.initialNav.addClass('hidden').before('<div id="menu">☰</div>');
      $('#menu').click(function(){
        that.els.initialNav.toggleClass('hidden');
      });

      $(window).resize(function(){
      	if(window.innerWidth > 768) {
      		$("#nav").removeAttr("style");
      	}
      });
  	},
    init : function() {
      app.responsiveNav.els = {
    	  initialNav : $('#nav')
      };
      // console.log('init');
      app.responsiveNav.responsiveNaviation();

    }
  };
  jQuery(document).ready(function() {
    app.responsiveNav.init();
  });
}(jQuery));

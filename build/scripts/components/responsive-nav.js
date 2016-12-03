var app = app || {};
(function($){
  app.responsiveNav = {
  	responsiveNaviation : function () {
      this.els.responsiveNav.addClass('hidden-nav')
      this.els.initialNav.addClass('hidden').before('<div id="menu">☰</div>');

      $('#menu').click(function(){
        // alert("jo");
        $(this).hide();
        setTimeout(function() {
          $('.overlays').css({
            'opacity': '0.8'
          });
        }, 80);
        $('#close-button').show();
        $('#responsive-nav').removeClass('hidden-nav');
      });

      $('#close-button').click(function() {
        $(this).hide();
        $('.overlays').css({
          'opacity': '0'
        });
        $('#menu').show();
        $('#responsive-nav').addClass('hidden-nav');
      });
  	},




    removeAttribute: function () {
      $(window).resize(function(){
      	if(window.innerWidth > 768) {
      		$("#nav").removeAttr("style");
      	}
      });
    },
    init : function() {
      app.responsiveNav.els = {
    	  initialNav : $('#nav'),
        responsiveNav : $('#responsive-nav')
      };
      // console.log('init');
      app.responsiveNav.responsiveNaviation();
      app.responsiveNav.removeAttribute();
    }
  };
  jQuery(document).ready(function() {
    app.responsiveNav.init();
  });
}(jQuery));

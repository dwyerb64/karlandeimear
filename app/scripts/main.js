'use strict';

var SEMICOLON = SEMICOLON || {};

(function($){
    
  //               //
 //  FUNCTIONS    //
//               //
SEMICOLON.documentOnReady = {
    init: function(){
    	 $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $htmlBody.stop(true).animate({
                    scrollTop: $($anchor.attr('href')).offset().top - 55
                  }, 1500);
                  event.preventDefault();
          });

    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
  functionName: function(){
        
  },

  sesEmail: function(){
  	// var emailParams = "Action=SendEmail
			// 			&Source=user%40example.com
			// 			&Destination.ToAddresses.member.1=allan%40example.com
			// 			&Message.Subject.Data=This%20is%20the%20subject%20line.
			// 			&Message.Body.Text.Data=Hello.%20I%20hope%20you%20are%20having%20a%20good%20day.";
            
  		// $.post();

  		$.ajax({
		    type: 'POST',
		    url: 'https://dxsgi1spah.execute-api.us-west-2.amazonaws.com/prod/sendemail',
		    contentType: 'application/json',
		    data: JSON.stringify({"name": "test", "email": "dwyerb@tcd.ie", "message": "test test"}),
		    dataType: 'json',
		    success: function (data) {
		        // Process success
		        alert("success");
		    },
		    error: function (e) {
		        // Process error

		        alert("error: " + e);
		    },
		});

  }
};





  //               //
 //  DOM objects  //
//               //
var $htmlBody = $('body,html'),
    $window = $(window),
    isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion);


  //          //
 //  Events  //
//          //
$(document).ready( SEMICOLON.documentOnReady.init );

$(document).scroll( SEMICOLON.documentOnReady.windowscroll );
        
        
})(jQuery);


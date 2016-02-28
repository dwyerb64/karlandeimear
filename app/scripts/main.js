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

       SEMICOLON.functions.startTime();

       $("#email-form").on( "submit", function( event ) {
        event.preventDefault();
        $('#submit').attr("disabled", true);
          $.ajax({
              type: 'POST',
              url: 'https://dxsgi1spah.execute-api.us-west-2.amazonaws.com/prod/sendemail',
              contentType: 'application/json',
              data: JSON.stringify(SEMICOLON.functions.serializeObject($('#email-form'))),
              dataType: 'json',
              success: function (data) {
                  // Process success
                  if(data.errorMessage){
                    alert(data.errorMessage);
                    $('#submit').attr("disabled", false);
                  }else{
                    SEMICOLON.functions.emailSuccess();
                  }
              },
              error: function (e) {
                  // Process error

                  alert( "Error occurred trying to email. Please try again." );
              },
          });
       });


    },
    
    windowscroll: function() {
        

    }

};

SEMICOLON.functions = {
    
  functionName: function(){
        
  },

  startTime: function(){
    var endtime = '2016-08-22';
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );

    document.getElementById('jsCountDown').innerHTML =    days + " days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
    var t = setTimeout(SEMICOLON.functions.startTime, 500);
  },

  emailSuccess: function(){
    $('#successEmail').modal('show');

  },

  serializeObject : function(form){
      var o = {};
      var a = form.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
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


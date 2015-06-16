$(function(){

	var app_id = '426904250826355';
	var scopes = 'email, user_friends, user_online_presence';

	var btn_login = '<a href = "#" id = "login" class = "btn btn-primary">Iniciar sesion></a>';

	var div_session = "<div id = ''facebook-session'>"+
					  "<strong></strong>"+
					  "<img>"+
					  "<a href = '#' id = 'logout class = 'btn btn-danger'>Cerrar session</a>"+
					  "</div>";

	window.fbAsyncInit = function() {
	
		FB.init({
			appId      : app_id,
			status 	   : true,
			cookie     : true,
			xfbml      : true,
			version    : 'v2.1'
		});	

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response, function(){

			});
		});

	};
	var statusChangeCallback = function(response, callback) {
    	console.log(response);
   
    	if (response.status === 'connected') {
    		getFacebookDate();
    	} else {
        	callback(false);
    	}
  	}

  	var checkLoginState = function(callback) {
    	FB.getLoginStatus(function(response) {
    		statusChangeCallback(response, function(data){
    			callback(data);
    		});
   		});
  	}

  	var getFacebookDate = function(){
  		FB.api('/me', function(response){
  			$('#login').ager(div_session);
  			$('#login').remove();
  			$('#facebook-session strong').text("Bienvenido: "+response.name);
  			$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
  		});
  	}
  	var facebookLogin = function(){
  		checkLoginState(function(response){
  			if (!response) {
  				console.log(response);
  				FB.login(function(response) {
  					if(response.status === 'connected')
  						getFacebookDate();
  				}, {scope: scopes});
  			}
  		})
  	}

  	$(document).on('clikc', '#login', function(e){
  		e.preventDefault();

  		facebookLogin();
  	})

})

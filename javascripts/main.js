$(function() {

	var app_id = '426904250826355';
	var scopes = 'email';

	var btn_login = '<a href="#" id="login" class="btn btn-primary btn">Login</a>';

	var div_session = "<div id='facebook-session'>"+
					  "<strong></strong>"+
					  "<img class="img-responsive" alt="Responsive image">"+
					  "<a href='#' id='logout' class='btn btn-danger btn'>Logout</a>"+
					  "</div>";

	window.fbAsyncInit = function() {

	  	FB.init({
	    	appId      : app_id,
	    	//status     : true,
	    	//cookie     : true,
	    	xfbml      : true, 
	    	version    : 'v2.3'
	  	});


	  	FB.getLoginStatus(function(response) {
	    	statusChangeCallback(response, function() {});
	  	});
  	};

  	var statusChangeCallback = function(response, callback) {
  		console.log(response);
   		
    	if (response.status === 'connected') {
      		getFacebookData();
    	} else {
     		callback(false);
    	}
  	}

  	var checkLoginState = function(callback) {
    	FB.getLoginStatus(function(response) {
      		callback(response);
    	});
  	}

  	var getFacebookData =  function() {
  		FB.api('/me', function(response) {
	  		$('#login').after(div_session);
	  		$('#login').remove();
	  		$('#facebook-session strong').text(response.name);
	  		$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
	  	});
  	}

  	var facebookLogin = function() {
  		checkLoginState(function(data) {
  			if (data.status !== 'connected') {
  				FB.login(function(response) {
  					if (response.status === 'connected')
  						getFacebookData();
  				}, {scope: scopes});
  			}
  		})
  	}

  	var facebookLogout = function() {
  		checkLoginState(function(data) {
  			if (data.status === 'connected') {
				FB.logout(function(response) {
					$('#facebook-session').before(btn_login);
					$('#facebook-session').remove();
				})
			}
  		})

  	}



  	$(document).on('click', '#login', function(e) {
  		e.preventDefault();
  		facebookLogin();
  	})

  	$(document).on('click', '#logout', function(e) {
  		e.preventDefault();
  		facebookLogout();
  	})

})


/*
$(function(){

	var app_id = '426904250826355';
	var scopes = 'email, user_friends, user_online_presence';

	var btn_login = '<a href = "#" id = "login" class = "btn btn-primary">Iniciar sesion></a>';

	var div_session = "<div id = 'facebook-session'>"+
					  "<strong></strong>"+
					  "<img>"+
					  "<a href = '#' id = 'logout' class = 'btn btn-danger'>Cerrar session</a>"+
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
    		getFacebookData();
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

  	var getFacebookData = function(){
  		FB.api('/me', function(response){
  			$('#login').after(div_session);
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
  						getFacebookData();
  				}, {scope: scopes});
  			}
  		})
  	}

  	var facebookLogout = function() {
  		FB.getLoginStatus(function(response) {
  			if(response.status === 'connected'){
  				FB.logout(function(response){
  					$('#facebook-session').before(btn_login);
  					$('#facebook-session').remove();
  				})
  			}
  		});
  	}

  	$(document).on('clikc', '#login', function(e){
  		e.preventDefault();

  		facebookLogin();
  	})

  	$(document).on('clikc', '#logout', function(e){
  		e.preventDefault();

  		if(confirm("logout?"))
  		facebookLogout();
  		else return false;
  	})


})
*/

$(function() {

	var app_id = '426904250826355';
	var scopes = 'email';

	var btn_login = '<a href="#" id="login" class="btn btn-primary btn">Login</a>';

	var div_session = "<div id='facebook-session'>"+
					  //"<strong></strong>"+
					  
					  "<a href='#' id='logout' class='btn btn-danger btn'>Logout</a>"+
					  "<img>"+
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
	  		$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=small');
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

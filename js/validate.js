$(function() {
	$('.error').hide(); 
    $("#send").click(function() {
		// validate and process form here  
		$('.error').hide();   
		var name = $("input#name").val();
			if (name == "") {
			$("label#name_error").show();
			$("input#name").focus();
			return false;
		}
		
		var email = $("input#email").val();
			if (email == "" || validEmail(email) == false) {
			$("label#email_error").show();
			$("input#email").focus();
			return false;
		}
		
		
		
		var website = $("input#business").val();
		var message = $("textarea#message").val();
			if (message == "" ) {
			$("label#message_error").show();
			$("input#message").focus();
			return false;
		}
		
		sendMail(name, email, website, message);
		return false;
	});
});

function validEmail(mail)
{
	var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(pattern.test(mail)){         
		return true;   
    }else{   
		return false; 
    }
}

function sendMail(name, email, website, message) {  
	
	  var dataString = 'name='+ name + '&email=' + email + '&website=' + website + '&message=' + message;
	  $.ajax({
		type: "POST",
		url: "mail.php",
		data: dataString,
		success: function() {
			  alert("Your message has been sent successfully. We will be in contact with you shortly.");
			  $('#feedback')[0].reset();
		},
		error: function() {
		  alert('Sorry but there seems to be some problems sending your request. Please try again later.');
		}
	  });
	  return false;
 }
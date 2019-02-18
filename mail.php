<?php

	$to = 'chrisoxygen@yahoo.com';

	$from=$_POST['name'];
	$subject = 'Client Request from MSRF website';
	
	$name = $_POST['name'];	
	$email = $_POST['email'];	
	$website = $_POST['website'];
	$text = $_POST['message'];
	
	$message = "";
	// build the message
   	$message .= "Name: $name\n\n";
	$message .= "Email: $email\n\n";
	$message .= 'Website: '.$website."\n\n"; 
	$message .= "Message: $text\n\n";
	
	$message = wordwrap($message, 80);
	$mailSent = mail($to, $subject, $message, "From:$from");
?>
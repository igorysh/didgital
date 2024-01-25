<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

$post = (!empty($_POST)) ? true : false;
if($post) {
	$url = $_SERVER['HTTP_REFERER'];
	$name = htmlspecialchars(trim($_POST['name']));
	$phone = htmlspecialchars(trim($_POST['phone']));
	$country_code = htmlspecialchars(trim($_POST['country_code']));

    $date = date('d/m/Y h:i:s a', time());
	$error = '';
	if(!$name) {$error .= 'name';}
	if(!$phone) {$error .= 'phone';}
	if(!$error) {
		$address = "mohylevskiy@gmail.com";
		$mes = "Сообщение отправлено c сайта Mohylevskyi.Digital ".$date." \n\nИмя: ".$name."\n\nТелефон: ".$country_code . $phone."\n";
		$send = mail ($address,$name,$mes,"Content-type:text/plain; charset = UTF-8\r\nReply-To: mohylevskyi.digital\r\nFrom: mohylevskyi.digital");
		if($send) {
			echo 'OK';

			// Telegram Mail

			$token = '5305730033:AAHO_gjeLEMYMAIoWa4kS39Q4c2-iqxcUtc';


			$telegram_text = array(
				'site'            => $_SERVER['SERVER_NAME'],'<br />',
				'bayer_name'      => $name,'<br />',
				'phone'           => $tel,'<br />',
				'comment'         => $comment,'<br />',
				'utm_source'      => $_SESSION['utms']['utm_source'],'<br />',  // utm_source 
				'utm_medium'      => $_SESSION['utms']['utm_medium'],'<br />',  // utm_medium 
				'utm_term'        => $_SESSION['utms']['utm_term'],'<br />',    // utm_term   
				'utm_content'     => $_SESSION['utms']['utm_content'],'<br />', // utm_content    
				'utm_campaign'    => $_SESSION['utms']['utm_campaign'] // utm_campaign
			);

			$data = [
				'parse_mode' => 'HTML',

				'text' => "Заявка <b>Mohylevskyi.Digital</b> \n\nИмя: $name\nТелефон: $country_code $phone\n\nСсылка: $url",
			
				'chat_id' => '-763094043'
			];

			file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );

		}
	}
	else {echo $error;}
}



?>
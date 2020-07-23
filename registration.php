<?php
include 'answer.php';
$newUser = json_decode($_POST["params"], true);
if (file_exists('db.xml')) {
    $userList = simplexml_load_file('db.xml');
    $registrationResult = false;
    foreach ($userList->user as $user) {
		if ((string)$user->login == $newUser['login']) {
			$registrationResult = new Answer(2, "Пользователь с таким логином существует");
		}
		if ((string)$user->email == $newUser['email']) {
			$registrationResult = new Answer(3, "Пользователь с таким адресом электронной почты существует");
		}
	}
	if (!$registrationResult) {
		$user = $userList->addChild('user');
		$user->addChild('login', $newUser['login']);
		$user->addChild('name', $newUser['name']);
		$user->addChild('password', md5($newUser['pass']));
		$user->addChild('email', $newUser['email']);
		$userList->saveXML('db.xml');
		$registrationResult = new Answer(4, "Пользователь успешно зарегистрирован");
	}
	$registrationResult = json_encode($registrationResult);
	echo $registrationResult;
} else {
    exit('Нет доступа к db.xml.');
}

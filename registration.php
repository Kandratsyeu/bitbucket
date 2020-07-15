<?php
$newUser = json_decode($_POST["params"], true);
if (file_exists('db.xml')) {
    $userList = simplexml_load_file('db.xml');
    $registrationResult = false;
    foreach ($userList->user as $user) {
		if ((string)$user->name == $newUser['name']) {
			$registrationResult = "Пользователь с таким именем существует";
		}
		if ((string)$user->email == $newUser['email']) {
			$registrationResult = "Пользователь с таким адресом электронной почты существует";
		}
	}
	if (!$registrationResult) {
		$user = $userList->addChild('user');
		$user->addChild('login', $newUser['login']);
		$user->addChild('name', $newUser['name']);
		$user->addChild('password', md5($newUser['pass']));
		$user->addChild('email', $newUser['email']);
		$userList->saveXML('db.xml');
		$registrationResult = "Пользователь успешно зарегистрирован";
	}
	echo $registrationResult;
} else {
    exit('Нет доступа к db.xml.');
}

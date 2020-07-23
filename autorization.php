<?php 
include 'answer.php';
session_start();
$answer = new Answer(0, 'Зарегистрируйтесь либо авторизуйтесь');
$customer = json_decode($_POST["params"], true);
if ($customer) {
	if (file_exists('db.xml')) {
		$userList = simplexml_load_file('db.xml');
		$answer =  new Answer(0, 'Пользователь с таким логином не зарегистрирован');
	    foreach ($userList->user as $user) {
			if ((string)$user->login == $customer['login']) {
				if ((string)$user->password == md5($customer['pass'])) {
					$answer = new Answer(1, (string)$user->name);	 
					$user->addChild('cookie', $_COOKIE['PHPSESSID']);
					$_SESSION['user_name'] = (string)$user->name;
					$_SESSION['user_login'] = (string)$user->login;
					$_SESSION['user_cookie'] = (string)$user->cookie;
				} else {
					$answer =  new Answer(0, 'Проверьте правильность ввода пароля');
				}
			}
		}
	} else {
	    $answer =  new Answer(0, 'Ошибка базы данных');
	}

}

if (isset($_SESSION['user_login']) && $_COOKIE['PHPSESSID']==$_SESSION['user_cookie']) {
	$answer = new Answer(1, $_SESSION['user_name']);
}
$answer = json_encode($answer);
echo $answer;
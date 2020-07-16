<?php 
session_start();
$customer = json_decode($_POST["params"], true);
if ($customer) {
	if (file_exists('db.xml')) {
		$userList = simplexml_load_file('db.xml');
	    foreach ($userList->user as $user) {
			if ((string)$user->login == $customer['login']) {
				if ((string)$user->password == md5($customer['pass'])) {
					echo (string)$user->name;
					$user->addChild('cookie', $_COOKIE['PHPSESSID']);
					$_SESSION['user_name'] = (string)$user->name;
					$_SESSION['user_login'] = (string)$user->login;
					$_SESSION['user_cookie'] = (string)$user->cookie;
					exit();
				} else {
					echo 0;
					exit();
				}
			}
		}
		echo 0;
	} else {
	    echo 'Заполните форму';
	}
}

if (isset($_SESSION['user_login']) && $_COOKIE['PHPSESSID']==$_SESSION['user_cookie']) {
	echo $_SESSION['user_name'];
} else {
	echo 0;
	exit();
}

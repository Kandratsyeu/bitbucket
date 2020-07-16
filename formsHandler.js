document.addEventListener('DOMContentLoaded', function() {
	let registrationForm = document.forms['registration'];
	let autorizationForm = document.forms['autorization'];
	sendRequest('', 'autorization.php');
	function checkFields(form) {
		let isFormCorrect = true;
		for (let i = form.length-1; i >= 0; i--) {
			if (form[i].tagName == 'INPUT') {
				form[i].onfocus = function(){
					form[i].classList.remove('false');	
				}
				if (form[i].type == 'email') {
					let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					if(!reg.test(form[i].value)) {
						form[i].classList.add('false');
						isFormCorrect = false;
					}
				} else if (form[i].value == '') {
						form[i].classList.add('false');
						isFormCorrect = false;			
				}
				
			}
		}
		return isFormCorrect;
	}
	registrationForm.onsubmit = function(e) {
		e.preventDefault();
		let isFormCorrect = checkFields(registrationForm);
		if (registrationForm.pass.value != '' && registrationForm.pass.value !== registrationForm.confirmPass.value) {
			alert('Пароли не совпадают!')
			registrationForm.confirmPass.classList.add('false');
			isFormCorrect = false;
		}
		if (isFormCorrect) {
			let parameters = {
				login: registrationForm.login.value,
				pass: registrationForm.pass.value,
				email: registrationForm.email.value,
				name: registrationForm.name.value
			}
			sendRequest(parameters, 'registration.php');
		}
	}
	autorizationForm.onsubmit = function(e) {
		e.preventDefault();
		let parameters = {
			login: autorizationForm.login.value,
			pass: autorizationForm.pass.value
		}
		sendRequest(parameters, 'autorization.php');
	}
	function sendRequest(parameters, handler) {
		parameters = 'params=' + JSON.stringify(parameters);
		let request = new XMLHttpRequest();
		request.open('POST', handler);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send(parameters);
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200){
				if (request.responseText == 0) {
					if (handler == 'autorization.php') {
						document.querySelector('#requestResult').innerHTML = '';	
					} else {
						document.querySelector('#requestResult').innerHTML = 'Проверьте правильность ввода данных';
					}
				} else if (handler == 'autorization.php' || handler == 'session.php') {
					document.querySelector('#requestResult').innerHTML = 'Hello, '+request.responseText;
					registrationForm.hidden = true;
					autorizationForm.hidden = true;
				} else {
					document.querySelector('#requestResult').innerHTML = request.responseText;					
				}
			}
		}
	}
	
});
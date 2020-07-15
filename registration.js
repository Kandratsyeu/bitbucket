document.addEventListener('DOMContentLoaded', function() {
	let registrationForm = document.forms['registration'];
	let isFormCorrect = false;
	for (let i = registrationForm.length-1; i >= 0; i--) {
		if (registrationForm[i].tagName == 'INPUT') {
			if (registrationForm[i].type == 'email') {
				registrationForm[i].onblur = function(){
					let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					if(!reg.test(registrationForm[i].value)) {
						registrationForm[i].classList.add('false');
						isFormCorrect = false;
					}
				}
			} else {
				registrationForm[i].onblur = function(){
					if(registrationForm[i].value == '' || registrationForm[i].value.toLowerCase().includes('select')) {
						registrationForm[i].classList.add('false');
						isFormCorrect = false;
					}
				}
			}
			registrationForm[i].onfocus = function(){
				registrationForm[i].classList.remove('false');
				isFormCorrect = true;
			}
		}
	}
	registrationForm.onsubmit = function(e) {
		e.preventDefault();
		if (registrationForm.pass.value !== registrationForm.confirmPass.value) {
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
			parameters = 'params=' + JSON.stringify(parameters);
			let request = new XMLHttpRequest();
			request.open('POST', 'registration.php');
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.send(parameters);
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200){
					document.querySelector('#requestResult').innerHTML = request.responseText;
				}
			}
		}
	}
});
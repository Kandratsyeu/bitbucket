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
					if(registrationForm[i].value == '') {
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
		if (isFormCorrect) {
			registrationForm.submit();
		}
	}
});
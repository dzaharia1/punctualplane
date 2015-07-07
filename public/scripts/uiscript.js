var inputParameters, inputFields;

var readyFunction = function() {
	inputParameters = document.querySelectorAll('.query-form__parameter');
	inputFields = document.querySelectorAll('.query-form__textbox');

	Array.prototype.forEach.call(inputParameters, function(parameter) {
		parameter.addEventListener('click', function(event) {
			var parameterInput = parameter.querySelector('.query-form__textbox');
			// var parameterLabel = parameter.querySelector('.query-form__label')
			// var animationDistance = parameterLabel.offsetWidth;
			// parameterLabel.style.right = (animationDistance + 10) + 'px';
			parameterInput.focus();
		});
	});

	Array.prototype.forEach.call(inputFields, function(field) {
		field.addEventListener('focusin', function(event) {
			var parameterLabel = field.parentNode.querySelector('.query-form__label');
			var animationDistance = parameterLabel.offsetWidth;
			parameterLabel.style.right = (animationDistance + 16) + 'px';
		});
		field.addEventListener('focusout', function(event) {
			if (field.value === '') {
				var parameterLabel = field.parentNode.querySelector('.query-form__label');
				parameterLabel.style.right = '-1rem';
			}
		});
	});
}

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}
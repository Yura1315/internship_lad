//---------------------------Задача 2----------------------------

let formElement = document.forms["formElement"];

for (i = 0; i < formElement.length; i++) {
	formElement[i].onfocus = function (evt) {
		let activeElement = evt.target;
		if (activeElement) {
			activeElement.classList.add("focused");
		} else {
			activeElement.classList.remove("focused");
		}
	};
}

for (let i = 0; i < formElement.length; i++) {
	formElement[i].onblur = function (evt) {
		let activeElement = evt.target;
		if (activeElement) {
			activeElement.classList.remove("focused");
		}
	};
}

const readlineSync = require("readline-sync");

//---------------------------Задача 3(Быки и коровы)---------------------------------
//Работает и с повторяющимися цифрами
let numCoincidense = "";
let numCoincidenseLength = 0;
let numNotCoincidense = "";
let numNotCoincidenseLenght = 0;
let alreadyNumCoincidenseIndex = [];
let attemp = 0;
let attemps = 9;

//=====================================================================
const randomNum = (min, max) => {
	let random = min + Math.random() * (max + 1 - min);
	return Math.floor(random);
};

let lengthNum = randomNum(3, 6);

const hiddenNum = (len) => {
	let arr = [];
	for (let i = len; i > 0; i--) {
		let num = randomNum(0, 9);
		arr.push(String(num));
	}
	return arr.join("");
};
//=====================================================================
let variant = hiddenNum(lengthNum);

while (attemps > 0) {
	const inputNum = readlineSync.question(`Введите ${variant.length}-е число: `);
	if (!Number(inputNum) || variant.length != inputNum.length) {
		console.log("Введите корректное значение!");
		console.log(`У вас осталось ${9 - attemp} попытки(-ок)`);
	} else if (variant === inputNum) {
		console.log(`Поздравляю вы победили за ${attemp + 1} попытки(-ок)!`);
		return;
	} else {
		for (let i = 0; i < inputNum.length; i++) {
			for (let j = 0; j < variant.length; j++) {
				if (inputNum[i] === variant[j] && i === j) {
					numCoincidense = numCoincidense.length ? numCoincidense + ", " + inputNum[i] : numCoincidense + inputNum[i];
					numCoincidenseLength = numCoincidenseLength + 1;
					alreadyNumCoincidenseIndex.push(i);
				}
			}
		}

		check: for (let i = 0; i < inputNum.length; i++) {
			for (let j = 0; j < variant.length; j++) {
				if (
					inputNum[i] === variant[j] &&
					i != j &&
					!alreadyNumCoincidenseIndex.includes(j) &&
					!alreadyNumCoincidenseIndex.includes(i)
				) {
					numNotCoincidense = numNotCoincidense.length
						? numNotCoincidense + ", " + inputNum[i]
						: numNotCoincidense + inputNum[i];
					numNotCoincidenseLenght = numNotCoincidenseLenght + 1;
					alreadyNumCoincidenseIndex.push(j);
					continue check;
				}
			}
		}
		console.log(
			`Cовпавших цифр не на своих местах - ${numNotCoincidenseLenght}(${numNotCoincidense}), цифр на своих местах - ${numCoincidenseLength}(${numCoincidense})`
		);
		console.log(`У вас осталось ${9 - attemp} попытки(-ок)`);
		numCoincidense = "";
		numCoincidenseLength = 0;
		numNotCoincidense = "";
		numNotCoincidenseLenght = 0;
		alreadyNumCoincidenseIndex = [];
	}
	attemps--;
	attemp++;
}

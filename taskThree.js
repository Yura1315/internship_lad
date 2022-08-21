const readlineSync = require("readline-sync");

//---------------------------Задача 3(Быки и коровы)---------------------------------
let numCoincidense = "";
let numCoincidenseLength = 0;
let numNotCoincidense = "";
let numNotCoincidenseLenght = 0;
let alreadyNumCoincidenseIndex = [];
let attemp = 0;
let attemps = 9;

const randomNum = () => {
	let random = 100 + Math.random() * (100000 + 1 - 100);
	return Math.floor(random).toString();
};

let variant = randomNum();

while (attemps > 0) {
	const inputNum = readlineSync.question(`Введите число ${variant.length}-е число: `);
	// console.log(inputNum);
	// console.log(variant);
	if (!Number(inputNum) || variant.length != inputNum.length) {
		console.log("Введите корректное значение!");
		console.log(`У вас осталось ${9 - attemp} попытки(-ок)`);
	} else if (variant === inputNum) {
		console.log(`Поздравляю вы победили за ${attemp} попытки(-ок)!`);
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

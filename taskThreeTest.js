const readlineSync = require("readline-sync");

//---------------------------Задача 3(Быки и коровы)---------------------------------
function ownPlaceNum(inputNum, variant) {
	for (let i = 0; i < inputNum.length; i++) {
		for (let j = 0; j < variant.length; j++) {
			if (inputNum[i] === variant[j] && i === j) {
				numCoincidense = numCoincidense.length
					? numCoincidense + ", " + inputNum[i]
					: numCoincidense + inputNum[i];
				numCoincidenseLength = numCoincidenseLength + 1;
				alreadyNumCoincidenseIndex.push(i);
			}
		}
	}
}

const randomNum = () => {
	let random = 100 + Math.random() * (100000 + 1 - 100);
	return Math.floor(random).toString();
};

let variant = randomNum();

function bullsAndCows(variant) {
	let numCoincidense = "";
	let numCoincidenseLength = 0;
	let numNotCoincidense = "";
	let numNotCoincidenseLenght = 0;
	let alreadyNumCoincidenseIndex = [];
	// let win = `Поздравляю вы победили за ${attemps - attemp} попыток!`;
	// let attempsLeft = `У вас осталось ${attemps - attemp} попыток`;
	let attemp = 0;

	function ownPlaceNum(inputNum, variant) {
		for (let i = 0; i < inputNum.length; i++) {
			for (let j = 0; j < variant.length; j++) {
				if (inputNum[i] === variant[j] && i === j) {
					numCoincidense = numCoincidense.length
						? numCoincidense + ", " + inputNum[i]
						: numCoincidense + inputNum[i];
					numCoincidenseLength = numCoincidenseLength + 1;
					alreadyNumCoincidenseIndex.push(i);
				}
			}
		}
	}

	let attemps = 9;
	while (attemps > 0) {
		const inputNum = readlineSync.question(`Введите число ${variant.length}-е число: `);
		console.log(inputNum);
		console.log(variant);
		if (!Number(inputNum) || variant.length != inputNum.length) {
			console.log("Введите корректное значение!");
			console.log(`У вас осталось ${9 - attemp} попытки(-ок)`);
		} else if (variant === inputNum) {
			console.log(win);
			return;
		} else {
			ownPlaceNum(variant, inputNum);
			check: for (let i = 0; i < inputNum.length; i++) {
				for (let j = 0; j < variant.length; j++) {
					console.log(
						`Сравниваю: ввел ${inputNum[i]}(${i}) -------------------${variant[j]} (${j})} `
					);
					console.log(alreadyNumCoincidenseIndex);
					if (
						inputNum[i] === variant[j] &&
						i != j &&
						!alreadyNumCoincidenseIndex.includes(j) &&
						!alreadyNumCoincidenseIndex.includes(i)
					) {
						console.log(`Кладу: ${inputNum[i]} в numNotCoincidense`);
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
}

bullsAndCows(variant);

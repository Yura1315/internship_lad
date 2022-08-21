const readlineSync = require("readline-sync");
//---------------------------Боевой маг Евстафий сражается с лютым монстром---------------------------------

const monster = {
	maxHealth: 10,
	name: "Лютый",
	moves: [
		{
			name: "Удар когтистой лапой",
			physicalDmg: 3, // физический урон
			magicDmg: 0, // магический урон
			physicArmorPercents: 20, // физическая броня
			magicArmorPercents: 20, // магическая броня
			cooldown: 0, // ходов на восстановление
		},
		{
			name: "Огненное дыхание",
			physicalDmg: 0,
			magicDmg: 4,
			physicArmorPercents: 0,
			magicArmorPercents: 0,
			cooldown: 3,
		},
		{
			name: "Удар хвостом",
			physicalDmg: 2,
			magicDmg: 0,
			physicArmorPercents: 50,
			magicArmorPercents: 0,
			cooldown: 2,
		},
	],
};

const magic = {
	maxHealth: 10,
	name: "Евстафий",
	moves: [
		{
			name: "Удар боевым кадилом",
			physicalDmg: 2,
			magicDmg: 0,
			physicArmorPercents: 0,
			magicArmorPercents: 50,
			cooldown: 0,
		},
		{
			name: "Вертушка левой пяткой",
			physicalDmg: 4,
			magicDmg: 0,
			physicArmorPercents: 0,
			magicArmorPercents: 0,
			cooldown: 4,
		},
		{
			name: "Каноничный фаербол",
			physicalDmg: 0,
			magicDmg: 5,
			physicArmorPercents: 0,
			magicArmorPercents: 0,
			cooldown: 3,
		},
		{
			name: "Магический блок",
			physicalDmg: 0,
			magicDmg: 0,
			physicArmorPercents: 100,
			magicArmorPercents: 100,
			cooldown: 4,
		},
	],
};

const cooldownMoves = [];
const cooldownMovesUnit = [];

// const randomIndex = (min, max) => {
// 	let random = min + Math.random() * (max + 1 - min);
// 	return Math.floor(random);
// };

function possibleMovesPlayer(cooldownMovesUnit, unitMoves) {
	let arr = [...unitMoves];
	if (!cooldownMovesUnit.length) {
		arr = [...unitMoves];
	} else {
		for (let i = 0; i < cooldownMovesUnit.length; i++) {
			for (let j = 0; j < unitMoves.length; j++) {
				if (cooldownMovesUnit[i].name === unitMoves[j].name) {
					arr.splice(j, 1);
				}
			}
		}
	}
	return arr;
}

function randomActionMonster(cooldownMoves, unitMoves) {
	let arr = [...unitMoves];
	if (!cooldownMoves.length) {
		arr = [...unitMoves];
	} else {
		for (let i = 0; i < cooldownMoves.length; i++) {
			for (let j = 0; j < unitMoves.length; j++) {
				if (cooldownMoves[i].name === unitMoves[j].name) {
					arr.splice(j, 1);
				}
			}
		}
	}
	let randomMoveIndex = Math.floor(Math.random() * arr.length);
	return arr[randomMoveIndex];
}

function decrCooldown(cooldowns) {
	for (let i = 0; i < cooldowns.length; i++) {
		cooldowns[i].cooldown = cooldowns[i].cooldown - 1;
		if (cooldowns[i].cooldown === 0) {
			cooldowns.splice(i, 1);
		}
	}
	return;
}

let a = possibleMovesPlayer(cooldownMovesUnit, magic.moves);
console.log(a);

let moves = 7;
let round = 1;
while (moves > 0) {
	console.log("---------------------------------------------");
	console.log(`${round} раунд`);
	if (round != 1) {
		decrCooldown(cooldownMoves);
		decrCooldown(cooldownMovesUnit);
	}
	let possiblemoveMonster = randomActionMonster(cooldownMoves, monster.moves);
	console.log(possiblemoveMonster);
	console.log("---------------------------------------------");
	console.log(`Лютый атакует!!!${possiblemoveMonster.name}`);
	if (possiblemoveMonster.cooldown > 0) {
		cooldownMoves.push({ name: possiblemoveMonster.name, cooldown: possiblemoveMonster.cooldown });
	}
	// console.log(cooldownMoves);
	console.log("---------------------------------------------");
	let possiblePlayer = possibleMovesPlayer(cooldownMovesUnit, magic.moves);
	console.log(possiblePlayer);
	console.log(cooldownMovesUnit);
	console.log("Возможные ходы");
	for (let i = 0; i < possiblePlayer.length; i++) {
		console.log(`${i}: ${possiblePlayer[i].name}`);
	}
	let movePlayer = readlineSync.question(`Сделайте свой ход: `);
	if (possiblePlayer[movePlayer].cooldown > 0) {
		cooldownMovesUnit.push({
			name: possiblePlayer[movePlayer].name,
			cooldown: possiblePlayer[movePlayer].cooldown,
		});
	}
	console.log("---------------------------------------------");
	moves--;
	round++;
}

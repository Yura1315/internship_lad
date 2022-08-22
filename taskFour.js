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

let flag = true;
let round = 1;
while (flag) {
	console.log("---------------------------------------------");
	console.log("/////////////////////////////////////////////");
	console.log(`${round} раунд`);
	if (round != 1) {
		decrCooldown(cooldownMoves);
		decrCooldown(cooldownMovesUnit);
	}
	let possiblemoveMonster = randomActionMonster(cooldownMoves, monster.moves);
	console.log("---------------------------------------------");
	console.log(`Лютый атакует!!!${possiblemoveMonster.name}`);
	if (possiblemoveMonster.cooldown > 0) {
		cooldownMoves.push({ name: possiblemoveMonster.name, cooldown: possiblemoveMonster.cooldown });
	}
	console.log("---------------------------------------------");
	let possiblePlayer = possibleMovesPlayer(cooldownMovesUnit, magic.moves);
	// console.log(cooldownMovesUnit);
	console.log("Возможные ходы");
	for (let i = 0; i < possiblePlayer.length; i++) {
		console.log(`${i}: ${possiblePlayer[i].name}`);
	}
	let movePlayer = readlineSync.question(`Сделайте свой ход: `);
	if (!isFinite(movePlayer) || movePlayer > possiblePlayer.length) {
		console.log("---------------------------------------------");
		console.log("Введите корректное значение!!!");
		console.log("---------------------------------------------");
		movePlayer = readlineSync.question(`Сделайте свой ход: `);
	}
	if (possiblePlayer[movePlayer].cooldown > 0) {
		cooldownMovesUnit.push({
			name: possiblePlayer[movePlayer].name,
			cooldown: possiblePlayer[movePlayer].cooldown,
		});
	}
	console.log("---------------------------------------------");
	console.log(`Вы наносите ответный удар!!!${possiblePlayer[movePlayer].name}`);
	console.log("---------------------------------------------");

	if (possiblemoveMonster.physicalDmg > 0) {
		if (possiblePlayer[movePlayer].physicArmorPercents) {
			let damage = possiblemoveMonster.physicalDmg * (1 - possiblePlayer[movePlayer].physicArmorPercents / 100);
			magic.maxHealth = magic.maxHealth - damage;
		} else {
			magic.maxHealth = magic.maxHealth - possiblemoveMonster.physicalDmg;
		}
	}

	if (possiblePlayer[movePlayer].physicalDmg > 0) {
		if (possiblemoveMonster.physicArmorPercents) {
			let damage = possiblePlayer[movePlayer].physicalDmg * (1 - possiblemoveMonster.physicArmorPercents / 100);
			monster.maxHealth = monster.maxHealth - damage;
		} else {
			monster.maxHealth = monster.maxHealth - possiblePlayer[movePlayer].physicalDmg;
		}
	}

	if (possiblemoveMonster.magicDmg > 0) {
		if (possiblePlayer[movePlayer].magicArmorPercents) {
			let damage = possiblemoveMonster.magicDmg * (1 - possiblePlayer[movePlayer].magicArmorPercents / 100);
			magic.maxHealth = magic.maxHealth - damage;
		} else {
			magic.maxHealth = magic.maxHealth - possiblemoveMonster.magicDmg;
		}
	}

	if (possiblePlayer[movePlayer].magicDmg > 0) {
		if (possiblemoveMonster.magicArmorPercents) {
			let damage = possiblePlayer[movePlayer].magicDmg * (1 - possiblemoveMonster.magicArmorPercents / 100);
			monster.maxHealth = monster.maxHealth - damage;
		} else {
			monster.maxHealth = monster.maxHealth - possiblePlayer[movePlayer].magicDmg;
		}
	}

	if (monster.maxHealth <= 0 || magic.maxHealth <= 0) {
		if (monster.maxHealth > magic.maxHealth) {
			console.log("Победа за Лютым!!!");
			console.log("---------------------------------------------");
			flag = false;
		} else if (monster.maxHealth === magic.maxHealth) {
			console.log("Погибли оба героя!!!Ничья!!!");
			console.log("---------------------------------------------");
		} else {
			console.log("Победа за Евстафием!!!");
			console.log("---------------------------------------------");
			flag = false;
		}
	}

	console.log(monster.maxHealth);
	console.log(magic.maxHealth);

	round++;
}

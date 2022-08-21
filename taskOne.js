//-------------------------Задача 1-----------------------------
let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

const renameDayOfTheWeek = (str) => {
	const arr = str.split(" ");
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].includes("ПОНЕДЕЛЬНИК")) {
			arr[i] = arr[i].replace("ПОНЕДЕЛЬНИК", "MONDAY");
		}
		if (arr[i].includes("ВТОРНИК")) {
			arr[i] = arr[i].replace("ВТОРНИК", "TUESDAY");
		}
		if (arr[i].includes("СРЕДА")) {
			arr[i] = arr[i].replace("СРЕДА", "WEDNESDAY");
		}
		if (arr[i].includes("ЧЕТВЕРГ")) {
			arr[i] = arr[i].replace("ЧЕТВЕРГ", "THURSDAY");
		}
		if (arr[i].includes("ПЯТНИЦА")) {
			arr[i] = arr[i].replace("ПЯТНИЦА", "FRIDAY");
		}
		if (arr[i].includes("СУББОТА")) {
			arr[i] = arr[i].replace("СУББОТА", "SATURDAY");
		}
		if (arr[i].includes("ВОСКРЕСЕНЬЕ")) {
			arr[i] = arr[i].replace("ВОСКРЕСЕНЬЕ", "SUNDAY");
		}
	}
	return arr.join(" ");
};

console.log(renameDayOfTheWeek(str));

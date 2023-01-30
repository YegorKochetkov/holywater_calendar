const pad = (input: number) => input.toString().padStart(2, "0");

export const dateToInputFormat = (date: Date) => {
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());

	return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
};

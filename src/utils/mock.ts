import { type EventType } from "../store/calendarStore";
import { dateToInputFormat } from "./dateToInputFormat";

const dateForMock = new Date();
export const mock: EventType[] = [
	{
		id: 1,
		title: "Mock Event",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum inventore quo vero porro animi ratione, dignissimos incidunt voluptas itaque deserunt id dolorem vitae, doloremque molestiae ipsa consectetur dolor, consequatur corrupti.",
		from: dateToInputFormat(dateForMock),
		to: dateToInputFormat(dateForMock),
		created: dateToInputFormat(dateForMock),
		updated: dateToInputFormat(dateForMock),
	},
];

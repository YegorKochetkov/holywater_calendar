import { type EventType } from "../store/calendarStore";
import { toBeginningOfDay } from "./toBeginningOfDay";

export function findEventsForDay(events: EventType[], day: Date) {
	const dateTime = day.getTime();
	const eventsForDay = events.filter((event) => {
		const eventFromTime = toBeginningOfDay(new Date(event.from)).getTime();
		const eventToTime = toBeginningOfDay(new Date(event.to)).getTime();

		return dateTime >= eventFromTime && dateTime <= eventToTime;
	});

	return eventsForDay;
}

import React, { memo, useMemo } from "react";
import useCalendarStore, { type EventType } from "../../store/calendarStore";
import { findEventsForDay } from "../../utils/findEventsForDay";
import { toBeginningOfDay } from "../../utils/toBeginningOfDay";
import EventShort from "../Event/Event";
import styles from "./MonthView.module.css";

const weeksRows = 6;
const daysInWeek = 7;
const dayInMilliseconds = 1000 * 3600 * 24;
const indexOfMonday = 1;

type MonthViewProps = {
	events: EventType[];
};

function MonthView({ events }: MonthViewProps) {
	const currentDay = toBeginningOfDay(new Date());
	const selectedDate = useCalendarStore((state) => state.selectedDate);
	const date = useMemo(
		() => toBeginningOfDay(new Date(selectedDate)),
		[selectedDate]
	);

	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

	const shiftToPrevMonday =
		firstDayOfMonth.getDay() - indexOfMonday < 0
			? daysInWeek - indexOfMonday
			: firstDayOfMonth.getDay() - indexOfMonday;

	const dayOfMonthView = new Date(
		firstDayOfMonth.getTime() - shiftToPrevMonday * dayInMilliseconds
	);

	const dates = useMemo(() => {
		const dates = [];

		for (let i = 0; i < weeksRows * daysInWeek; i++) {
			const day = toBeginningOfDay(new Date(dayOfMonthView));
			dates.push({ day, events: findEventsForDay(events, day) });
			dayOfMonthView.setDate(dayOfMonthView.getDate() + 1);
		}

		return dates;
	}, [date, events]);

	return (
		<div className={styles.monthView}>
			{dates.map((currDate, index) => (
				<div
					key={index}
					className={`
						${styles.cell}
						${currentDay.getTime() === currDate.day.getTime() ? styles.current : ""}
						${date.getTime() === currDate.day.getTime() ? styles.selected : ""}
						${
							firstDayOfMonth.getMonth() === currDate.day.getMonth()
								? ""
								: styles.anotherMonth
						}
					`}
				>
					<div className={styles.date}>
						<span>{currDate.day.getDate()}</span>
						<span>
							{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
								currDate.day
							)}
						</span>
					</div>
					{currDate.events.map((event) => (
						<EventShort key={event.id} id={event.id} />
					))}
				</div>
			))}
		</div>
	);
}

export default memo(MonthView);

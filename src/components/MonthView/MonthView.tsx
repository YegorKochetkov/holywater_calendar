import React, { Fragment, memo, useMemo } from "react";
import styles from "./MonthView.module.css";

const weeksRows = 6;
const daysInWeek = 7;
const dayInMilliseconds = 1000 * 3600 * 24;
const indexOfMonday = 1;

function toBeginningOfDay(date: Date) {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}

type MonthViewProps = {
	date: Date;
	// Events: unknown[];
};

function MonthView({ date }: MonthViewProps) {
	const currentDay = toBeginningOfDay(new Date());
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
			const day = new Date(dayOfMonthView);
			dates.push(day);
			// Dates.push({ date, events: findEventsForDate(events, date) });
			dayOfMonthView.setDate(dayOfMonthView.getDate() + 1);
		}

		return dates;
	}, [date]);

	return (
		<div className={styles.monthView}>
			{dates.map((date, index) => (
				<div
					key={index}
					className={`
						${styles.cell}
						${currentDay.getTime() === date.getTime() ? styles.current : ""}
						${firstDayOfMonth.getMonth() === date.getMonth() ? "" : styles.anotherMonth}
					`}
				>
					<div className={styles.date}>
						<span>{date.getDate()}</span>
						<span>
							{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
								date
							)}
						</span>
					</div>
					{/* {date.events.map((event, index) => (
						<MiniEvent
							key={index}
							event={event}
							setViewingEvent={setViewingEvent}
						/>
					))} */}
				</div>
			))}
		</div>
	);
}

export default memo(MonthView);

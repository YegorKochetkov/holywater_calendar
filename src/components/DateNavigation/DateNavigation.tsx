import React, { useState } from "react";
import styles from "./DateNavigation.module.css";

type DateFilterProps = {
	date: Date;
	onChangeDate: React.Dispatch<React.SetStateAction<Date>>;
};

enum Direction {
	prev = "prev",
	next = "next",
}

function DateNavigation({ date, onChangeDate }: DateFilterProps) {
	function handleMonthChange(direction: Direction) {
		const newDate = new Date(date);

		if (direction === Direction.prev) {
			if (date.getMonth() === 0) {
				newDate.setMonth(11);
				newDate.setFullYear(date.getFullYear() - 1);
			} else {
				newDate.setMonth(date.getMonth() - 1);
			}
		}

		if (direction === Direction.next) {
			if (date.getMonth() === 11) {
				newDate.setMonth(0);
				newDate.setFullYear(date.getFullYear() + 1);
			} else {
				newDate.setMonth(date.getMonth() + 1);
			}
		}

		onChangeDate(newDate);
	}

	return (
		<div className={styles.dateNavigation}>
			<button
				className="back"
				onClick={() => {
					handleMonthChange(Direction.prev);
				}}
			>
				prev
			</button>

			<div>
				{new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)}{" "}
				{date.getFullYear()}
			</div>

			<button
				onClick={() => {
					handleMonthChange(Direction.next);
				}}
			>
				next
			</button>
		</div>
	);
}

export default DateNavigation;

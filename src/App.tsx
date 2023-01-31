import React, { Fragment, useEffect } from "react";
import MonthView from "./components/MonthView/MonthView";
import styles from "./App.module.css";
import DateNavigation from "./components/DateNavigation/DateNavigation";
import useCalendarStore, { type EventType } from "./store/calendarStore";
import { mock } from "./utils/mock";
import { useNavigate, useParams } from "react-router-dom";

function App() {
	const events = useCalendarStore((state) => state.events);
	const setEvents = useCalendarStore((state) => state.setEvents);
	const fetchError = useCalendarStore((state) => state.fetchError);
	const selectedDate = useCalendarStore((state) => state.selectedDate);
	const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
	const navigate = useNavigate();
	const { date } = useParams();

	useEffect(() => {
		if (date) {
			setSelectedDate(date);
		}
	}, [date]);

	useEffect(() => {
		if (!events) {
			setEvents(mock);
		}
	}, []);

	useEffect(() => {
		navigate(`${selectedDate}`);
	}, [selectedDate]);

	if (fetchError) {
		return (
			<div>
				<p>Something went wrong.</p>
				<p>{fetchError}</p>
			</div>
		);
	}

	return (
		<Fragment>
			<div className={styles.app}>
				<DateNavigation />
				<MonthView />
			</div>
		</Fragment>
	);
}

export default App;

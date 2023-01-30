import React, { Fragment, useEffect } from "react";
import MonthView from "./components/MonthView/MonthView";
import styles from "./App.module.css";
import DateNavigation from "./components/DateNavigation/DateNavigation";
import useCalendarStore, { type EventType } from "./store/calendarStore";
import { mock } from "./utils/mock";

function App() {
	const events = useCalendarStore((state) => state.events);
	const setEvents = useCalendarStore((state) => state.setEvents);
	const fetchError = useCalendarStore((state) => state.fetchError);

	useEffect(() => {
		if (!events) {
			setEvents(mock);
		}
	}, []);

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
				<MonthView events={events ?? []} />
			</div>
		</Fragment>
	);
}

export default App;

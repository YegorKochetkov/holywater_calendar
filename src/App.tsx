import React, { Fragment, useEffect, useState } from "react";
import MonthView from "./components/MonthView/MonthView";
import styles from "./App.module.css";
import DateNavigation from "./components/DateNavigation/DateNavigation";
import useCalendarStore, { type EventType } from "./store";
import Modal from "./components/Modal/Modal";

const dateForMock = new Date();

const mock: EventType[] = [
	{
		id: 1,
		title: "Mock Event",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum inventore quo vero porro animi ratione, dignissimos incidunt voluptas itaque deserunt id dolorem vitae, doloremque molestiae ipsa consectetur dolor, consequatur corrupti.",
		from: dateForMock.getTime(),
		to: dateForMock.getTime(),
	},
];

function App() {
	const [currDate, setCurrDate] = useState(new Date());
	const [showModal, setShowModal] = useState(false);
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
				<DateNavigation
					date={currDate}
					onChangeDate={setCurrDate}
					toggleModal={setShowModal}
				/>
				<MonthView
					date={currDate}
					events={events ?? mock}
					toggleModal={setShowModal}
				/>
			</div>
			<Modal isOpen={showModal} toggleModal={setShowModal} />
		</Fragment>
	);
}

export default App;

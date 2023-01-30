import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import useCalendarStore from "../../store/calendarStore";
import EventForm from "../EventForm/EventForm";
import Modal from "../Modal/Modal";
import styles from "./Event.module.css";

type EventShortType = {
	id: number;
};

function EventShort({ id }: EventShortType) {
	const event = useCalendarStore((store) => store.getEvent(id));
	const [showEventForm, setShowEventForm] = useState(false);

	return event ? (
		<Fragment>
			<button
				type="button"
				name="edit event"
				className={styles.eventShort}
				onClick={() => setShowEventForm(true)}
			>
				{event?.title}
			</button>

			{showEventForm &&
				createPortal(
					<Modal onClose={() => setShowEventForm(false)}>
						<EventForm id={id} onClose={() => setShowEventForm(false)} />
					</Modal>,
					document.body
				)}
		</Fragment>
	) : null;
}

export default EventShort;

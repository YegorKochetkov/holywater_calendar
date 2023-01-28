import React from "react";
import useCalendarStore from "../../store";
import styles from "./EventShort.module.css";

type EventShortType = {
	id: number;
	showEvent: () => void;
};

function EventShort({ id, showEvent }: EventShortType) {
	const event = useCalendarStore((store) => store.getEvent(id));

	return (
		<p
			className={styles.title}
			onClick={() => {
				showEvent();
			}}
		>
			{event?.title}
		</p>
	);
}

export default EventShort;

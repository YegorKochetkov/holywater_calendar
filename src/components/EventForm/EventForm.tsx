import React, { type FormEventHandler, useState } from "react";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { dateToInputFormat } from "../../utils/dateToInputFormat";
import useCalendarStore, { type EventType } from "../../store/calendarStore";
import styles from "./EventForm.module.css";
import { useNavigate } from "react-router-dom";

type EventFormType = {
	id?: number;
	onClose: () => void;
};

function EventForm({ id, onClose }: EventFormType) {
	const event = id
		? useCalendarStore((state) => state.getEvent(id))
		: undefined;
	const updateEvent = useCalendarStore((state) => state.updateEvent);
	const addEvent = useCalendarStore((state) => state.addEvent);
	const deleteEvent = useCalendarStore((state) => state.deleteEvent);
	const events = useCalendarStore((state) => state.events);
	const nextId = events?.length ? events[events.length - 1].id + 1 : 1;
	const [fromDate, setFromDate] = useState(
		dateToInputFormat(event ? new Date(event.from) : new Date())
	);
	const [isValidForm, setIsValidForm] = useState(false);
	const navigate = useNavigate();

	const handleFormChange: FormEventHandler<HTMLFormElement> = (e) => {
		const form = new FormData(e.currentTarget);
		const isValid = Boolean(
			form.get("title")?.toString().trim() &&
				form.get("description")?.toString().trim() &&
				form.get("from")?.toString()
		);

		setIsValidForm(isValid);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const formData: Partial<EventType> = Object.fromEntries(form);

		const newEvent: EventType = {
			id: id ?? nextId,
			title: formData.title!.trim(),
			description: formData.description!.trim(),
			from: formData.from!,
			to: formData.to ? formData.to : formData.from!,
			created: event?.created ?? dateToInputFormat(new Date()),
			updated: dateToInputFormat(new Date()),
		};

		if (event) {
			updateEvent(newEvent);
		} else {
			addEvent(newEvent);
		}

		onClose();
		navigate(-1);
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
			onChange={handleFormChange}
		>
			<div>
				<h1 className={styles.form_title}>
					{event ? "Edit event" : "Add event"}
				</h1>
				{event && (
					<span className={styles.form_info}>
						{event.created === event.updated
							? `Created at: ${event.created.split("T").join(" ")}`
							: `Updated at: ${event.updated.split("T").join(" ")}`}
					</span>
				)}
			</div>
			<label className={styles.form_field}>
				Name
				<input
					type="text"
					placeholder="ie. My Event"
					name="title"
					defaultValue={event?.title}
					className={styles.form_input}
					autoFocus
					required
				/>
			</label>

			<label className={styles.form_field}>
				Date from
				<input
					type="datetime-local"
					name="from"
					defaultValue={event?.from ?? fromDate}
					onChange={(event) => setFromDate(event.target.value)}
					className={styles.form_input}
					required
				/>
			</label>

			<label className={styles.form_field}>
				Date to
				<input
					type="datetime-local"
					name="to"
					defaultValue={event?.to}
					min={fromDate}
					className={styles.form_input}
				/>
			</label>

			<label className={styles.form_field}>
				Description
				<textarea
					name="description"
					rows={5}
					className={styles.form_textarea}
					required
					defaultValue={event?.description}
				/>
			</label>

			<div className={styles.form_buttons}>
				{event && (
					<Button
						type="button"
						onClick={() => deleteEvent(event.id)}
						className={styles.form_button}
						color="warning"
						variant="contained"
					>
						<DeleteOutlineOutlinedIcon />
					</Button>
				)}
				<Button
					type="submit"
					disabled={!isValidForm}
					className={`${styles.form_button} ${styles.form_buttonDisabled}`}
					color="primary"
					variant="contained"
				>
					Save
				</Button>
			</div>
		</form>
	);
}

export default EventForm;

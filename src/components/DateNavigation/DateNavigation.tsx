import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import useCalendarStore from "../../store/calendarStore";
import EventForm from "../EventForm/EventForm";
import styles from "./DateNavigation.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { toBeginningOfDay } from "../../utils/toBeginningOfDay";
import { dateToInputFormat } from "../../utils/dateToInputFormat";

enum Direction {
	prev = "prev",
	next = "next",
}

function DateNavigation() {
	const { eventId } = useParams();
	const [showEventForm, setShowEventForm] = useState(eventId === "new");
	const selectedDate = useCalendarStore((state) => state.selectedDate);
	const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
	const date = useMemo(() => new Date(selectedDate), [selectedDate]);
	const navigate = useNavigate();

	useEffect(() => {
		if (eventId === "new") {
			setShowEventForm(true);
		} else {
			setShowEventForm(false);
		}
	}, [eventId]);

	function handleDatePick(value: string) {
		if (value) {
			setSelectedDate(value);
			navigate(`/${value}`);
		}
	}

	function handleAddEvent() {
		navigate("/events/new");
	}

	const handleMonthChange = useCallback(
		(direction: Direction) => {
			const newDate = toBeginningOfDay(new Date(selectedDate));
			newDate.setDate(1);

			if (direction === Direction.prev) {
				if (date.getMonth() === 0) {
					newDate.setFullYear(date.getFullYear() - 1);
					newDate.setMonth(11);
				} else {
					newDate.setMonth(date.getMonth() - 1);
				}
			}

			if (direction === Direction.next) {
				if (date.getMonth() === 11) {
					newDate.setFullYear(date.getFullYear() + 1);
					newDate.setMonth(0);
				} else {
					newDate.setMonth(date.getMonth() + 1);
				}
			}

			const stringDate = dateToInputFormat(newDate);
			setSelectedDate(stringDate);
			navigate(`/${stringDate}`);
		},
		[selectedDate]
	);

	return (
		<div className={styles.dateNavigation}>
			<IconButton
				size="large"
				color="primary"
				aria-label="add event"
				onClick={() => handleAddEvent()}
				sx={{ marginRight: "auto" }}
			>
				<AddCircleIcon sx={{ width: "2.5rem", height: "2.5rem" }} />
			</IconButton>

			{showEventForm &&
				createPortal(
					<Modal onClose={() => setShowEventForm(false)}>
						<EventForm onClose={() => setShowEventForm(false)} />
					</Modal>,
					document.body
				)}

			<IconButton
				size="large"
				color="primary"
				aria-label="set previous month"
				onClick={() => handleMonthChange(Direction.prev)}
			>
				<ArrowBackIosNewOutlinedIcon />
			</IconButton>

			<div>
				{new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)}{" "}
				{date.getFullYear()}
			</div>

			<IconButton
				size="large"
				color="primary"
				aria-label="set next month"
				onClick={() => handleMonthChange(Direction.next)}
			>
				<ArrowForwardIosOutlinedIcon />
			</IconButton>

			<DatePicker
				withPortal
				onChange={(date) => date && handleDatePick(dateToInputFormat(date))}
				customInput={
					<IconButton size="large" color="primary" aria-label="set next month">
						<CalendarTodayOutlinedIcon />
					</IconButton>
				}
			/>
		</div>
	);
}

export default memo(DateNavigation);

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z, ZodError } from "zod";
import { dateToInputFormat } from "../components/EventForm/EventForm";

const apiUrl = "https://api";

const eventType = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	from: z.string(),
	to: z.string(),
	created: z.string(),
	updated: z.string(),
});

const fetchData = eventType.array();

type DataType = z.infer<typeof fetchData>;
export type EventType = z.infer<typeof eventType>;

type EventsStateType = {
	events: EventType[] | undefined;
	selectedDate: string;
	fetchError: string | undefined;
	loadEvents: () => void;
	setEvents: (events: EventType[]) => void;
	getEvent: (id: number) => EventType | undefined;
	updateEvent: (event: EventType) => void;
	deleteEvent: (id: number) => void;
	addEvent: (event: EventType) => void;
	setSelectedDate: (date: string) => void;
};

const useCalendarStore = create<EventsStateType>()(
	devtools(
		persist(
			(set, get) => ({
				events: undefined,
				fetchError: undefined,
				selectedDate: dateToInputFormat(new Date()),

				async loadEvents() {
					set({ fetchError: undefined }, false, "loadEvents");

					try {
						const response = await fetch(apiUrl);
						const events: DataType = fetchData.parse(await response.json());

						set({ events, fetchError: undefined }, false, "loadEvents");
					} catch (error) {
						if (error instanceof ZodError) {
							set(
								{ fetchError: JSON.stringify(error.issues) },
								false,
								"loadEvents"
							);
						} else if (error instanceof Error) {
							set({ fetchError: error.message }, false, "loadEvents");
						} else {
							set({ fetchError: String(error) }, false, "loadEvents");
						}
					}
				},

				setEvents(events: EventType[]) {
					set({ events }, false, "setEvents");
				},

				setSelectedDate(date: string) {
					set({ selectedDate: date }, false, "setSelectedDate");
				},

				getEvent(id: number) {
					const { events } = get();
					const event = events?.find((event) => event.id === id) ?? undefined;

					return event;
				},

				updateEvent(event: EventType) {
					const { events } = get();

					if (events) {
						const updatedEvents = events.map((currEvent) =>
							event.id === currEvent.id ? event : currEvent
						);

						set({ events: updatedEvents }, false, "updateEvent");
					}
				},

				addEvent(event: EventType) {
					const { events } = get();
					const newEvents = events ? [...events, event] : [event];

					set({ events: newEvents }, false, "addEvent");
				},

				deleteEvent(id: number) {
					const { events } = get();
					const newEvents = events?.filter((event) => event.id !== id);

					set({ events: newEvents }, false, "deleteEvent");
				},
			}),
			{
				name: "holywater_task",
			}
		)
	)
);

export default useCalendarStore;

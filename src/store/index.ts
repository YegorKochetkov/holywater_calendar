import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z, ZodError } from "zod";

const apiUrl = "https://api";

const eventType = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	from: z.number(),
	to: z.number(),
});

const fetchData = eventType.array();

type DataType = z.infer<typeof fetchData>;
export type EventType = z.infer<typeof eventType>;

type EventsStateType = {
	events: EventType[] | undefined;
	date: number | undefined;
	fetchError: string | undefined;
	loadEvents: () => void;
	setEvents: (events: EventType[]) => void;
	getEvent: (id: number) => EventType | undefined;
	setDate: (date: number) => void;
};

const useCalendarStore = create<EventsStateType>()(
	devtools(
		persist(
			(set, get) => ({
				events: undefined,
				fetchError: undefined,
				date: undefined,

				async loadEvents() {
					set({ fetchError: undefined }, false, "loadEvents");

					try {
						const response = await fetch(apiUrl);
						const events: DataType = fetchData.parse(await response.json());

						set({ events, fetchError: undefined }, false, "loadArticles");
					} catch (error) {
						if (error instanceof ZodError) {
							set({ fetchError: JSON.stringify(error.issues) });
						} else if (error instanceof Error) {
							set({ fetchError: error.message });
						} else {
							set({ fetchError: String(error) });
						}
					}
				},

				setEvents(events: EventType[]) {
					set({ events });
				},

				setDate(date: number) {
					set({ date });
				},

				getEvent(id: number) {
					const { events } = get();
					const event = events?.find((event) => event.id === id) ?? undefined;

					return event;
				},
			}),
			{
				name: "holywater_task",
			}
		)
	)
);

export default useCalendarStore;

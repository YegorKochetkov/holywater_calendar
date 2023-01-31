import React from "react";
import { createHashRouter, redirect } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/Error/ErrorPage";
import EventForm from "../components/EventForm/EventForm";

const router = createHashRouter([
	{
		path: "",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: ":date",
				element: <App />,
			},
		],
	},
	{
		path: "/events",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: ":eventId",
				element: <App />,
			},
		],
	},
]);

export default router;

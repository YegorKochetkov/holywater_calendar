import React from "react";
import { useRouteError } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function ErrorPage() {
	const error = useRouteError() as Error;

	return <ErrorMessage error={error?.message || "unknown error"} />;
}

export default ErrorPage;

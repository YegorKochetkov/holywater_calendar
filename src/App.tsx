import React, { useState } from "react";
import MonthView from "./components/MonthView/MonthView";
import styles from "./App.module.css";
import DateNavigation from "./components/DateNavigation/DateNavigation";

function App() {
	const [currDate, setCurrDate] = useState(new Date());

	return (
		<div className={styles.app}>
			<DateNavigation date={currDate} onChangeDate={setCurrDate} />
			<MonthView date={currDate} />
		</div>
	);
}

export default App;

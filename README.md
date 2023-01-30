# [Demo](https://yegorkochetkov.github.io/holywater_calendar/)

## Task

The application is the calendar of events.
New user of the application:

1. Page consisting of:

   - the form opening button
   - date filter( the current month is selected by default)
   - the calendar grid selected in the date filter

   The cell includes:

   - day of the month (1, 2, 3...)
   - weekday
   - list of events

   The cell that corresponds to the current day is visually highlighted.

2. Date filter:

   - buttons "<" and ">" change a month cyclically
   - the calendar button allows to choose a year and month

3. Creating an event:

   - click on the "add event" button
   - the empty form will open
   - the form consists of 3 fields:

     - title (required)
     - description
     - date (required)

   - time
   - save button stores data and closes the form

4. Event on editing/removal:

   - click the event opens the completed form in editing mode:
     - created at/ updated at
     - save button updates event and closes the form

5. Requirements:

   - do not use ready -made calendars.
   - the application retains the status of the filter after reloading the page
   - the application uses localstorage as a data storage
   - provide the replacement storage, for example, REST API

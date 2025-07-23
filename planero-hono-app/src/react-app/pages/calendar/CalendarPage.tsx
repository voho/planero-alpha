import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export const CalendarPage = () => {
    return (
        <main>
            <FullCalendar
                plugins={[dayGridPlugin]}
                locale="cs"
                buttonText={{
                    today: 'Dnes',
                    prev: "Předchozí",
                    next: "Následující",
                    prevYear: "Minulý rok",
                    nextYear: "Nadcházející rok"
                }}
                initialView="dayGridMonth"
                events={[
                    {title: 'event 1', date: '2025-07-30'},
                    {title: 'event 2', date: '2025-07-25'}
                ]}
                aspectRatio={2}
            />
        </main>
    )
}
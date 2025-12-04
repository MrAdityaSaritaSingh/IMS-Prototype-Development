import { Drive } from '../types';

interface CalendarEvent {
    title: string;
    description: string;
    location?: string;
    startTime: string; // ISO string
    endTime: string;   // ISO string
}

export const generateICSFile = (event: CalendarEvent) => {
    const formatDate = (dateStr: string) => {
        return dateStr.replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const start = formatDate(new Date(event.startTime).toISOString());
    const end = formatDate(new Date(event.endTime).toISOString());
    const now = formatDate(new Date().toISOString());

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//IMS Prototype//Student Placement//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@ims.com`,
        `DTSTAMP:${now}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location || 'TBD'}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const addToGoogleCalendar = (event: CalendarEvent) => {
    const start = new Date(event.startTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const end = new Date(event.endTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}`;

    window.open(url, '_blank');
};

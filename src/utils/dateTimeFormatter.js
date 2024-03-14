export function formatDate(str) {
    const dateTime = new Date(str);
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formattedDate = dateTime.toLocaleDateString('en-US', dateOptions);

    return `${formattedDate}`;
}

export function formatTime(str) {
    const dateTime = new Date(str);
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);

    return `${formattedTime}`;
}
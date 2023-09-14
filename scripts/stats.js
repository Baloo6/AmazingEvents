

const $eventStats = document.getElementById('eventStats');
const $pastEventsStats = document.getElementById('pastEventsStats');
const $upcomingEventsStats = document.getElementById('upcomingEventsStats');

//Fn para el fetch de la api
async function getData() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        const data = await response.json();
        finalData(data);
    } catch (error) {
        console.error('Error in try fetching', error);
    }
}

getData();

function finalData(data) {
    const { events, currentDate } = data;
    //Filtrado de past y upcoming 
    const filterUpcomingEvents = (events, curDate) =>
        events.filter(event => Date.parse(event.date) > Date.parse(curDate));

    const upcomingEvents = filterUpcomingEvents(events, currentDate);

    const filterPastEvents = (events, curDate) =>
        events.filter(event => Date.parse(event.date) < Date.parse(curDate));

    const pastEvents = filterPastEvents(events, currentDate);

    const upcomingCats = [...new Set(upcomingEvents.map(event => event.category))];
    const pastCats = [...new Set(pastEvents.map(event => event.category))];
    //Filtrado por % de asistencia
    const highestAssistance = events =>
        events.reduce((acc, { assistance, capacity, name }) => {
            const number = (assistance / capacity) * 100;
            if (number > acc.contador) {
                return { contador: number, eventTitle: name };
            }
            return acc;
        }, { contador: 0, eventTitle: "" });

    const lowestAssistance = events =>
        events.reduce((acc, { assistance, capacity, name }) => {
            const number = (assistance / capacity) * 100;
            if (number < acc.contador) {
                return { contador: number, eventTitle: name };
            }
            return acc;
        }, { contador: 100, eventTitle: "" });

    const largerCapacity = events =>
        events.reduce((acc, { capacity, name }) => {
            if (capacity > acc.contador) {
                return { contador: capacity, eventTitle: name };
            }
            return acc;
        }, { contador: 0, eventTitle: "" });

    // Inner de las stats en las tablas
    $eventStats.innerHTML = `<td>${highestAssistance(pastEvents).eventTitle} ${highestAssistance(pastEvents).contador.toFixed(2)}%</td>
    <td>${lowestAssistance(pastEvents).eventTitle} ${lowestAssistance(pastEvents).contador.toFixed(2)}%</td>
    <td>${largerCapacity(events).eventTitle} ${largerCapacity(events).contador.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>`;

    const dataEvents = (categories, events) =>
        categories.map(category => {
            const eventsCats = events.filter(event => event.category === category);
            const eventsRevenues = eventsCats.reduce((accumulator, event) => accumulator + event.price * (event.estimate || event.assistance), 0);
            const attendance = eventsCats.reduce((accumulator, event) => accumulator + ((event.assistance || event.estimate) / event.capacity) * 100, 0) / eventsCats.length;

            return {
                category,
                eventsRevenues,
                attendance,
            };
        });

    const pastEventsData = dataEvents(pastCats, createPastEvents);
    const upcomingEventsData = dataEvents(upcomingCats, upcomingEvents);

    const generateTemplate = event => `<tr>
        <td>${event.category}</td>
        <td>$ ${event.eventsRevenues.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
        <td>${event.attendance.toFixed(2)}%</td>
    </tr>`;

    const createCards = (dataEvent, timeEvent) => {
        const templateCardsUpcoming = dataEvent.map(event => generateTemplate(event)).join('');
        timeEvent.innerHTML = templateCardsUpcoming;
    };

    createCards(pastEventsData, $pastEventsStats);
    createCards(upcomingEventsData, $upcomingEventsStats);

}
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { events, startDay, type } from './components/RsCalendar';
import { event, trainers } from './components/Event';
import { groupedEvents, namesDaysOfWeek, weeksDates } from './components/RsCalendarMonth';
import { dayHours, weekDays, groupedEventsForWeek, eventsAllDayForWeek } from './components/RsCalendarWeek';

export default combineReducers({
  routing: routerReducer,
  events,
  startDay,
  type,
  dayHours,
  weekDays,
  namesDaysOfWeek,
  weeksDates,
  groupedEventsForWeek,
  eventsAllDayForWeek,
  groupedEvents,
  event,
  trainers,
});


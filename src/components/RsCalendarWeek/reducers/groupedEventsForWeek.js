import moment from 'moment';
import { momentConst } from '../../../momentConst';

function getGroupedEvents(events) {
  const groupedEvents = {};
  events.forEach((event) => {
    const dayKey = moment(event.start).format(momentConst.dayKey);
    const dayOfStart = moment(event.start).startOf('day');
    const dayOfEnd = moment(event.end).startOf('day');
    if (!dayOfEnd.diff(dayOfStart)) {
      let ev = {};
      ev.startBorder = (event.start.hours() * 60) + event.start.minutes();
      ev.endBorder = (event.end.hours() * 60) + (event.end.minutes() - ev.startBorder);
      ev = Object.assign({}, event, ev);
      if (!groupedEvents[dayKey]) {
        groupedEvents[dayKey] = [];
      }
      groupedEvents[dayKey].push(ev);
    }
  });
  return groupedEvents;
}

export function groupedEventsForWeek(state = {}, action) {
  if (action.type === 'FETCH_EVENTS_SUCCESS') {
    return getGroupedEvents(action.events);
  }
  return state;
}

export default groupedEventsForWeek;

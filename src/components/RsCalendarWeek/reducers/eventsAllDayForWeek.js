import moment from 'moment';
import { momentConst } from '../../../momentConst';

function getEventsAllDayForWeek(startDay, events) {
  const eventsAllDayForWeekArray = [];
  events.forEach((event) => {
    const dayOfStart = moment(event.start).startOf('day');
    const dayOfEnd = moment(event.end).startOf('day');
    if (dayOfEnd.diff(dayOfStart)) {
      const endWeek = moment(startDay).add(7, 'day');
      const isStartBeforeRange = event.end.diff(startDay) > 0 && startDay.diff(event.start) > 0;
      const isEndAfterRange = endWeek.diff(event.start) > 0 && event.end.diff(endWeek) > 0;
      const isInRange = event.start.diff(startDay) > 0 && endWeek.diff(event.end) > 0;
      if (isStartBeforeRange || isEndAfterRange || isInRange) {
        let ev = {};
        ev.isStartBeforeRange = isStartBeforeRange;
        ev.isEndAfterRange = isEndAfterRange;
        ev.isInRange = isInRange;
        ev.left = moment(event.start).format(momentConst.weekDay) - 1;
        ev.width = moment(event.end).format(momentConst.weekDay) - ev.left;
        if (isStartBeforeRange) {
          ev.left = 0;
          ev.width = moment(event.end).format(momentConst.weekDay);
        }
        if (isEndAfterRange) {
          ev.width = 8 - moment(event.start).format(momentConst.weekDay);
        }
        ev = Object.assign({}, event, ev);
        eventsAllDayForWeekArray.push(ev);
      }
    }
  });
  return eventsAllDayForWeekArray;
}

export function eventsAllDayForWeek(state = [], action) {
  if (action.type === 'FETCH_EVENTS_SUCCESS') {
    return getEventsAllDayForWeek(action.startDay, action.events);
  }
  if (action.type === 'CHANGE_STARTDAY') {
    return getEventsAllDayForWeek(action.nextStartDay, action.events);
  }
  return state;
}

export default eventsAllDayForWeek;

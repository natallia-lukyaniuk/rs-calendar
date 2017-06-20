import moment from 'moment';
import { momentConst } from '../../../momentConst';

function getGroupedEvents(startMonth, events) {
  const groupedEventsArray = {};
  const endMonth = moment(startMonth).endOf('month').endOf('isoWeek');
  let startOfWeek = moment(startMonth).startOf('isoWeek');
  let endOfWeek = moment(startOfWeek).endOf('isoWeek');
  const daysCount = endMonth.diff(startOfWeek, 'days');
  let dayKey = moment(startOfWeek).format(momentConst.dayKey);
  for (let i = 0; i < (daysCount / 7); i += 1) {
    for (let j = 0; j < events.length; j += 1) {
      const event = events[j];
      const isStartBeforeRange =
        event.end.diff(startOfWeek) > 0 &&
        startOfWeek.diff(event.start) > 0;
      const isEndAfterRange = endOfWeek.diff(event.start) > 0 && event.end.diff(endOfWeek) > 0;
      const isInRange = event.start.diff(startOfWeek) > 0 && endOfWeek.diff(event.end) > 0;
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
        if (!groupedEventsArray[dayKey]) {
          groupedEventsArray[dayKey] = [];
        }
        ev = Object.assign({}, event, ev);
        groupedEventsArray[dayKey].push(ev);
      }
    }
    startOfWeek = moment(startOfWeek).add(7, 'day');
    endOfWeek = moment(startOfWeek).endOf('isoWeek');
    dayKey = moment(startOfWeek).format(momentConst.dayKey);
  }
  return groupedEventsArray;
}

export function groupedEvents(state = {}, action) {
  if (action.type === 'FETCH_EVENTS_SUCCESS') {
    return getGroupedEvents(action.startDay, action.events);
  }
  if (action.type === 'CHANGE_STARTDAY') {
    return getGroupedEvents(action.nextStartDay, action.events);
  }
  return state;
}

export default groupedEvents;

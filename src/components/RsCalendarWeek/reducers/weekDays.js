import moment from 'moment';

function getWeekDays(startDay) {
  const weekDaysArray = [];
  for (let i = 0; i < 7; i += 1) {
    const nextDay = moment(startDay).add(i, 'days');
    weekDaysArray.push(nextDay);
  }
  return weekDaysArray;
}

const startDay = moment().startOf('isoWeek');
const initialState = getWeekDays(startDay);

export function weekDays(state = initialState, action) {
  if (action.type === 'CHANGE_STARTDAY') {
    return getWeekDays(action.nextStartDay);
  }
  return state;
}

export default weekDays;

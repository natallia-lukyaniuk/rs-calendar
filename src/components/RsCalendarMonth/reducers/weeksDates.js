import moment from 'moment';

function getWeeksDates(startMonth) {
  const endMonth = moment(startMonth).endOf('month').endOf('isoWeek');
  const startMonthWeek = moment(startMonth).startOf('isoWeek');
  const daysCount = endMonth.diff(startMonthWeek, 'days');
  const weeksDatesArray = [];
  for (let i = 0; i < ((daysCount + 1) / 7); i += 1) {
    const weekRow = [];
    for (let j = 0; j < 7; j += 1) {
      weekRow.push(moment(startMonthWeek).add((i * 7) + j, 'day'));
    }
    weeksDatesArray.push(weekRow);
  }
  return weeksDatesArray;
}

const initialState = getWeeksDates(moment().startOf('month'));

export function weeksDates(state = initialState, action) {
  if (action.type === 'CHANGE_STARTDAY') {
    return getWeeksDates(action.nextStartDay);
  }
  return state;
}

export default weeksDates;

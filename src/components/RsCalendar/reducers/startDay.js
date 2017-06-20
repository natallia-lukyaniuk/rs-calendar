import moment from 'moment';

const initialState = moment().startOf('isoWeek');

export function startDay(state = initialState, action) {
  if (action.type === 'CHANGE_STARTDAY') {
    return action.nextStartDay;
  }
  return state;
}

export default startDay;

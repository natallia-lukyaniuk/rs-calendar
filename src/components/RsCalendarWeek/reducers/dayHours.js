import moment from 'moment';
import { momentConst } from '../../../momentConst';

function getDayHours() {
  const hours = [];
  for (let i = 0; i < 24; i += 1) {
    hours.push(moment().startOf('day').add(i, 'hours').format(momentConst.dayHours));
  }
  return hours;
}

const initialState = getDayHours();

export function dayHours(state = initialState) {
  return state;
}

export default dayHours;

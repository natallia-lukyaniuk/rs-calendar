import { getTrainers } from './trainers';
import { DataService } from '../../../data-service';

const dataService = new DataService();

export const getEvent = id => (dispatch) => {
  dataService.getEvent(id).then((event) => {
    dispatch({ type: 'FETCH_EVENT_SUCCESS', event });
    getTrainers(event.speakers).then((trainers) => {
      dispatch({ type: 'FETCH_TRAINERS_SUCCESS', trainers });
    });
  });
};

export default getEvent;

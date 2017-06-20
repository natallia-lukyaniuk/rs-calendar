import { DataService } from '../../../data-service';

const dataService = new DataService();

export const getEvents = startDay => (dispatch) => {
  dataService.getEvents().then((events) => {
    dispatch({ type: 'FETCH_EVENTS_SUCCESS', startDay, events });
  });
};

export default getEvents;

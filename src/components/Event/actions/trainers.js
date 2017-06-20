import Q from 'q';
import { DataService } from '../../../data-service';

const dataService = new DataService();

export const getTrainers = trainers => Q.all(dataService.getTrainers(trainers));
export default getTrainers;

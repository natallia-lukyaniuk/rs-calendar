import moment from 'moment';

export class DataService {
  constructor() {
    this.apiUrl = 'http://128.199.53.150';
  }
  getPromise(route) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${this.apiUrl}/${route}`;
      xhr.open('GET', url);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const resp = JSON.parse(xhr.response);
          resolve(resp);
        } else {
          console.error(xhr.statusText);
          reject(xhr.statusText);
        }
      };
    });
  }
  getEvents() {
    return this.getPromise('events').then((events) => {
      const momentEvents = events.map((event) => {
        let ev = {};
        ev.start = moment(event.start);
        ev.end = moment(event.start).add(event.duration, 'milliseconds');
        ev = Object.assign({}, event, ev);
        return ev;
      });
      return momentEvents;
    });
  }
  getEvent(eventId) {
    const route = `events/${eventId}`;
    return this.getPromise(route).then((event) => {
      let ev = {};
      ev.start = moment(event.start).format('MMMM D, YYYY H.mmA');
      ev.end = moment(event.start).add(event.duration, 'milliseconds');
      ev = Object.assign({}, event, ev);
      return ev;
    });
  }
  getTrainer(id) {
    const route = `trainers/${id}`;
    return this.getPromise(route);
  }
  getTrainers(trainersId) {
    const trainers = [];
    for (let i = 0, length = trainersId.length; i < length; i += 1) {
      trainers.push(this.getTrainer(trainersId[i]));
    }
    return trainers;
  }
}

export default DataService;

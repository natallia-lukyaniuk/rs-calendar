export function events(state = [], action) {
  if (action.type === 'FETCH_EVENTS_SUCCESS') {
    return action.events;
  }
  return state;
}

export default events;
